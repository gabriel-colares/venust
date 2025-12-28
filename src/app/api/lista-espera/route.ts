import { NextResponse } from "next/server";
import { z } from "zod";
import { firestore } from "@/firebase/admin";

const payloadSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  segment: z.enum(["barbershop", "client"]),
  city: z.string().trim().min(1).max(80).optional(),
  source: z.enum(["home-cta", "sou-barbearia-final-cta", "buscar"]),
});

function makeDocId(input: { email: string; segment: string; city?: string }) {
  const normalizedCity = input.city?.trim().toLowerCase();
  return [
    encodeURIComponent(input.segment),
    encodeURIComponent(normalizedCity ?? "-"),
    encodeURIComponent(input.email.trim().toLowerCase()),
  ].join("__");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { email, segment, city, source } = parsed.data;
  const docId = makeDocId({ email, segment, city });
  const now = Date.now();

  try {
    const docRef = firestore.collection("waitlist").doc(docId);

    const result = await firestore.runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      if (snap.exists) {
        const data = snap.data() as { createdAt?: number } | undefined;
        return { created: false, createdAt: data?.createdAt ?? null };
      }

      tx.set(docRef, {
        email,
        emailNormalized: email,
        segment,
        city: city ?? null,
        cityNormalized: city ? city.trim().toLowerCase() : null,
        source,
        createdAt: now,
        updatedAt: now,
      });

      return { created: true, createdAt: now };
    });

    return NextResponse.json(
      { status: result.created ? "created" : "exists" },
      { status: result.created ? 201 : 200 },
    );
  } catch {
    return NextResponse.json({ error: "Erro ao salvar." }, { status: 500 });
  }
}

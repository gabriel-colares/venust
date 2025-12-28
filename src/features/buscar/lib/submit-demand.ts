export type LeadProfile = "client" | "barbershop";

export type SubmitDemandResult = { status: "created" | "exists" };

export async function submitDemand(payload: {
  email: string;
  city: string;
  profile: LeadProfile;
  source: "buscar";
}): Promise<SubmitDemandResult> {
  const res = await fetch("/api/lista-espera", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      segment: payload.profile,
      city: payload.city,
      source: payload.source,
    }),
  });

  if (!res.ok && res.status !== 200) {
    throw new Error("Failed to submit demand");
  }

  const data = (await res.json().catch(() => null)) as {
    status?: "created" | "exists";
  } | null;

  if (data?.status === "created" || data?.status === "exists") {
    return { status: data.status };
  }

  return { status: res.status === 201 ? "created" : "exists" };
}

export function hasBarbershops(_city: string) {
  return false;
}

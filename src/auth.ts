import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import { firestore } from "@/firebase/admin";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  providers: [
    Google,
    Resend({
      from: "Venust <no-reply@venust.com.br>",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});

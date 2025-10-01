import { SignupForm } from "@/components/auth/signup-form";
import { SvgVenust } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex justify-between min-h-svh">
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <SvgVenust className="size-8" color="#FFF" />
          </Link>

          <Link
            href="/entrar"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            Entrar
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <SignupForm />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text-[#9B9C9E] text-sm font-medium hover:underline">
            Venust © 2025
          </span>

          <Link
            href="#privacy_policy"
            className="text-[#9B9C9E] text-sm font-medium hover:underline"
          >
            Políticas de Privacidade
          </Link>
        </div>
      </div>

      <div className="relative hidden lg:flex">
        <Image
          src="/images/57209.jpg"
          alt="illustration signup"
          width={612}
          height={982}
          priority
          className="inset-0 h-dvh object-cover object-bottom rounded-l-3xl"
        />
      </div>
    </div>
  );
}

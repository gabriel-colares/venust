import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { SvgVenust } from "@/components/ui/icons";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-2xl"
          >
            <SvgVenust className="text-primary size-8" color="#FFF" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
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
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/57209.jpg"
          alt="Image"
          fill
          className="object-cover object-bottom brightness-[0.8]"
          priority
        />
      </div>
    </div>
  );
}

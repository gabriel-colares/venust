"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { SvgGoogle } from "@/components/ui/icons";

// Definição do schema de validação com Zod
const signupSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    terms: z.boolean({ message: "Você deve aceitar os Termos de Serviço." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control, // Usamos o control para o Controller
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await axios.post("/api/auth/user", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      await signIn("credentials", {
        redirectTo: "/",
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl text-left font-medium">
          Gerencie seu estabelecimento e veja seu lucro aumentar.
        </h1>
      </div>

      <div className="grid gap-6">
        <div className="flex justify-between items-start gap-6">
          <div className="w-full grid gap-2">
            <Label className="text-[#9B9C9E]" htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Digite aqui"
              autoComplete="name"
              className="h-12 bg-[#1A1D21] border-[#363A3D]"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-xs font-medium leading-none">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full grid gap-2">
            <Label className="text-[#9B9C9E]" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              className="h-12 bg-[#1A1D21] border-[#363A3D]"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs font-medium leading-none">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start gap-6">
          <div className="w-full grid gap-2">
            <Label className="text-[#9B9C9E]" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha aqui"
              autoComplete="new-password"
              className="h-12 bg-[#1A1D21] border-[#363A3D]"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-xs font-medium leading-none">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full grid gap-2">
            <Label className="text-[#9B9C9E]" htmlFor="confirmPassword">
              Reafirme sua senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Reescreva sua senha"
              autoComplete="new-password"
              className="h-12 bg-[#1A1D21] border-[#363A3D]"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs font-medium leading-none">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  className="bg-[#1A1D21]"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <label
              htmlFor="terms"
              className="text-[#CDCECF] text-sm font-medium leading-none"
            >
              Eu concordo com os{" "}
              <Link href={"#terms-of-services"} className="text-venust-primary">
                Termos de Serviço.
              </Link>
            </label>
          </div>

          {errors.terms && (
            <span className="text-red-500 text-xs font-medium leading-none">
              {errors.terms.message}
            </span>
          )}
        </div>

        {/* Botão de criar conta */}
        <Button
          type="submit"
          className="w-full h-12 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <>Criar conta gratuita</>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-50 bg-[#0D0F10] px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>

        {/* Botão de login com Google */}
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center hover:text-white/90 gap-2"
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <Fragment>
              <SvgGoogle className="size-4" />
              Entrar com Google
            </Fragment>
          )}
        </Button>
      </div>
    </form>
  );
}

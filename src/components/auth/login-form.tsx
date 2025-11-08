"use client";

import { Button } from "@/components/ui/button";
import { SvgGoogle } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        console.error("Erro no login:", result.error);
        // Aqui você pode adicionar uma notificação de erro
      }
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 max-w-md w-full text-white",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium">
          Seja bem-vindo ao <span className="text-primary">Venust.</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Entre na sua conta e gerencie seu negócio com precisão e suas margens
          conosco.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-muted-foreground">
              Senha
            </Label>
            <a href="#" className="text-sm text-[#45D9A6] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Botão principal */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
        >
          {isLoading ? "Entrando..." : "Login"}
        </Button>

        {/* Divisor */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-3 text-sm text-muted-foreground">
            Ou continue com
          </span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Google login */}
        <Button
          variant="outline"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full h-12 border border-gray-700 bg-transparent text-white hover:bg-gray-900 hover:text-white/80"
        >
          <SvgGoogle className="mr-2 size-4" />
          Login com Google
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        Não possui uma conta ainda?{" "}
        <a href="/cadastrar" className="text-[#45D9A6] hover:underline">
          Criar conta
        </a>
      </div>
    </form>
  );
}

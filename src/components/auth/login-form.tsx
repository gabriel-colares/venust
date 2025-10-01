import { Button } from "@/components/ui/button";
import { SvgGoogle } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
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
            required
            className="h-12 bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Botão principal */}
        <Button
          type="submit"
          className="w-full h-12 bg-white text-black hover:bg-gray-200"
        >
          Login
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

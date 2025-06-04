"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const schema = z.object({
  email: z.string().email("E-mail invalido").min(1, "Este campo é obrigatório"),
  password: z.string().min(1, "Informe a senha"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm({ className }: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get("/api/orders");
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);
  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/login", formData);
      toast.success("Login realizado com sucesso");
      router.push("/");
    } catch {
      toast.error("Credenciais invalidas");
      setLoading(false);
    }
  });
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Acesse a sua conta
          </CardTitle>
          <CardDescription>
            Faça login para continuar usando a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="joao@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {!loading && "Login"}
                  {loading && "Acessando sua conta...."}
                </Button>
                <Button variant="outline" className="w-full">
                  Login com o Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <a href="/cadastro" className="underline underline-offset-4">
              Cadastre-se
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

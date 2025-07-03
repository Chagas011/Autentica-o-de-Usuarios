"use client";
import axios from "axios";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Digite seu nome"),
  lastName: z.string().min(1, "Digite seu sobrenome"),
  email: z.string().email("E-mail invalido").min(1, "Digite um e-mail valido"),
  password: z.string().min(8, "Sua senha deve ter no minimo 8 Caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function CadastroForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (dataForm) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/cadastro", dataForm);
      toast.success("Usuario criado com sucesso", {
        description: "Faça login agora mesmo",
      });
      router.push("/login");
    } catch {
      toast.error("Erro ao criar Usuario");
      setLoading(false);
    }
  });
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Cadastre-se</CardTitle>
          <CardDescription>
            Cadastre-se para continuar usando a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Form {...form}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Joao" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobrenome</FormLabel>
                          <FormControl>
                            <Input placeholder="Romario" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-3 mt-2">
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
                <div className="grid gap-3 mt-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="*********"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {!loading && "Criar conta"}
                    {loading && "Criando conta..."}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login com Google
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex flex-row gap-1 items-center justify-center">
              <p>Ja tem uma conta?</p>
              <a href="/login" className="underline">
                acesse agora !
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

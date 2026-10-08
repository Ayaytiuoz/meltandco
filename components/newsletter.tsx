"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveInbox } from "@/lib/orders";

const schema = z.object({
  email: z.string().email("Indiquez un e-mail valide"),
});

type Values = z.infer<typeof schema>;

export function Newsletter() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-[760px] rounded-[2rem] bg-beige px-6 py-12 text-center sm:px-12">
        <h2 className="font-serif text-4xl">Une petite envie de nouveautés ? 🍪</h2>
        <p className="mx-auto mt-3 max-w-md text-milk">
          Inscrivez-vous pour découvrir nos nouvelles saveurs, offres et éditions limitées.
        </p>
        {done ? (
          <p className="mt-8 text-chocolate" role="status">
            C’est noté. On garde votre adresse pour la prochaine fournée.
          </p>
        ) : (
          <form
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit((values) => {
              saveInbox("newsletter", values);
              setDone(true);
            })}
          >
            <div className="flex-1 text-left">
              <label className="sr-only" htmlFor="newsletter-email">
                E-mail
              </label>
              <Input id="newsletter-email" type="email" placeholder="votre@email.com" autoComplete="email" {...register("email")} />
              {errors.email ? (
                <p className="mt-2 text-sm text-[#8A3E36]" role="alert">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <Button type="submit">S’inscrire</Button>
          </form>
        )}
      </div>
    </section>
  );
}

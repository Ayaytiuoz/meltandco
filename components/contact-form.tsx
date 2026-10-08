"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import { saveInbox } from "@/lib/orders";
import { whatsappHref } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Indiquez votre nom"),
  email: z.string().email("Indiquez un e-mail valide"),
  message: z.string().min(8, "Écrivez-nous quelques mots"),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  if (done) {
    return (
      <div role="status">
        <p className="font-serif text-3xl">Message bien reçu.</p>
        <p className="mt-3 text-milk">Pour une réponse tout de suite, WhatsApp reste le plus rapide.</p>
        <a
          href={whatsappHref(siteConfig.whatsappGreeting)}
          className="mt-6 inline-flex h-12 items-center rounded-full bg-cocoa px-6 text-[0.72rem] uppercase tracking-[0.16em] text-cream"
        >
          Ouvrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => {
        saveInbox("contact", values);
        setDone(true);
      })}
    >
      <Field label="Nom" htmlFor="contact-name" error={errors.name?.message}>
        <Input id="contact-name" {...register("name")} />
      </Field>
      <Field label="E-mail" htmlFor="contact-email" error={errors.email?.message}>
        <Input id="contact-email" type="email" {...register("email")} />
      </Field>
      <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
        <Textarea id="contact-message" {...register("message")} />
      </Field>
      <Button type="submit">Envoyer</Button>
    </form>
  );
}

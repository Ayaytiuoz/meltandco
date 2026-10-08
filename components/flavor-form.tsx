"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/config";
import { saveInbox } from "@/lib/orders";

const schema = z.object({
  flavor: z.string().min(2, "Dites-nous la saveur"),
  name: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function FlavorForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  if (done) {
    return (
      <p className="mt-6 text-milk" role="status">
        On a noté. Cette envie rejoint la prochaine fournée.
      </p>
    );
  }

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={handleSubmit((values) => {
        saveInbox("flavor", { flavor: values.flavor, name: values.name ?? "" });
        setDone(true);
      })}
    >
      <div className="flex flex-wrap gap-2">
        {siteConfig.flavorIdeas.map((idea) => (
          <button
            key={idea}
            type="button"
            className="rounded-full bg-white px-4 py-2 text-sm text-chocolate"
            onClick={() => setValue("flavor", idea, { shouldValidate: true })}
          >
            {idea}
          </button>
        ))}
      </div>
      <Field label="Votre saveur" htmlFor="flavor">
        <Input id="flavor" {...register("flavor")} placeholder="Pistache, lotus…" />
      </Field>
      {errors.flavor ? (
        <p className="text-sm text-[#8A3E36]" role="alert">
          {errors.flavor.message}
        </p>
      ) : null}
      <Field label="Prénom, si vous voulez" htmlFor="flavor-name">
        <Input id="flavor-name" {...register("name")} />
      </Field>
      <Button type="submit">Proposer une saveur</Button>
    </form>
  );
}

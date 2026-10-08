import type { Metadata } from "next";
import { Suspense } from "react";
import { Confirmation } from "@/components/confirmation";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-[50vh] pt-32" />}>
      <ConfirmedOrder searchParams={searchParams} />
    </Suspense>
  );
}

async function ConfirmedOrder({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  return <Confirmation orderId={order ?? ""} />;
}

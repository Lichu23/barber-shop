"use client";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/services/clerkServices";
import { formatDate } from "@/utils/formatDate";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  user: User;
}

export default function AccountData({ user }: Props) {
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setLoadingCancel(true);
    try {
      const res = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: user.stripe_subscription_id,
          clerkUserId: user.clerk_user_id,
        }),
      });
      const json = await res.json();

      if (res.ok) {
        toast.success("Plan cancelado correctamente.");
        router.refresh();
      } else {
        toast.error(json.error || "No se pudo cancelar el plan.");
      }
    } catch {
      toast.error("Error cancelando el plan.");
    } finally {
      setLoadingCancel(false);
    }
  };

  const handlePay = async () => {
    setLoadingPay(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        alert(json.error || "No se pudo iniciar el checkout.");
      }
    } catch {
      alert("Error iniciando el checkout");
    } finally {
      setLoadingPay(false);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-5 mb-5">
        <h2 className="text-xl lg:text-3xl font-bold">
          Informacion de la cuenta
        </h2>
        <p className="text-base lg:text-xl font-bold">
          Dominio:
          <span className="font-normal">
            {user.tenant_id === null ? "dominio no asignado" : user.tenant_id}
          </span>
        </p>
        <p className="text-base lg:text-xl font-bold">
          Subscripcion:
          {user.subscription_status === "canceled" ? (
            <span className="font-normal"> Cancelada</span>
          ) : (
            <span className="font-normal"> {user.subscription_status}</span>
          )}
        </p>
        <p className="text-base lg:text-xl font-bold">
          Siguiente Pago:
          <span className="font-normal">
            {formatDate(user?.paid_until ?? undefined) ||
              "No hay ningun pago aun"}
          </span>
        </p>
      </div>
      <div className="flex gap-2 mb-5">
        <SignOutButton>
          <Button className="rounded-xl bg-black w-fit hover:bg-gray-800 text-sm lg:text-base">
            Cerrar Sesion
          </Button>
        </SignOutButton>
        <Button
          disabled={loadingCancel}
          onClick={handleCancel}
          className="rounded-xl bg-red-600 w-fit hover:bg-red-900 text-sm lg:text-base"
        >
          {loadingCancel ? "Cancelando plan..." : "Cancelar Plan"}
        </Button>

        <Button
          disabled={loadingPay}
          onClick={handlePay}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm lg:text-base"
        >
          {loadingPay ? "Creando pago…" : "Pagar Plan"}
        </Button>
      </div>
    </div>
  );
}

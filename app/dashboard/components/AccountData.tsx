import { Button } from "@/components/ui/button";
import { User } from "@/lib/services/clerkServices";
import { SignOutButton } from "@clerk/nextjs";
import React from "react";

interface Props {
    user: User
}

export default function AccountData({user}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl lg:text-3xl font-bold">
        Informacion de la cuenta
      </h2>
      <p className="text-base lg:text-xl">
        Dominio: <span className="font-normal">{user.tenant_id === null ? "dominio no asignado" : user.tenant_id}</span>
      </p>
      <p className="text-base lg:text-xl mb-4">
        Estado de la cuenta: <span className="font-normal">{user.status}</span>
      </p>

      <div className="flex gap-5 mb-5">
        <SignOutButton>
          <Button className="rounded-xl bg-black w-fit hover:bg-gray-800 font-bold text-sm lg:text-base">
            Cerrar Sesion
          </Button>
        </SignOutButton>
        <Button className="rounded-xl bg-red-600 w-fit hover:bg-red-900 font-bold text-sm lg:text-base">
          Cancelar Plan
        </Button>
      </div>
    </div>
  );
}

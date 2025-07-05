"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ReactNode, useState } from "react";
import { useReservation } from "../../context/ReservationContext";

interface Props {
  children: ReactNode;
}

export const SuccessModal = ({ children }: Props) => {
  const {success, setSuccess} = useReservation()
  return (
    <Dialog open={success} onOpenChange={setSuccess}>
      <DialogContent className="min-w-3xl">

        {children}
      </DialogContent>
    </Dialog>
  );
};

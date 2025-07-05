"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export const SuccessModal = ({title, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-md">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

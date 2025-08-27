"use client";

import { TenantProfile } from "@/lib/services/tenantServices";
import Head from "next/head";
import { useLayoutEffect, useState } from "react";
import { Toaster } from "sonner";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  tenantProfile: TenantProfile;
}

export default function ClientLayoutWrapper({
  children,
  tenantProfile,
}: ClientLayoutWrapperProps) {
  return (
    <>
      <style>{`
        :root {
          --primary: ${tenantProfile.color_primary};
          --secondary: ${tenantProfile.color_secondary};
          --accent: ${tenantProfile.color_accent};
          --foreground: ${tenantProfile.color_text_dark};
          --background: ${tenantProfile.color_text_light};
        }
      `}</style>
      {children}
      <Toaster richColors />
    </>
  );
}

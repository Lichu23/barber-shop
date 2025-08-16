import { z } from "zod";
export const serviceSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  description: z.string().nonempty("La descripción es obligatoria"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
});

export const onboardingSchema = z.object({
  tenant_id: z.string().optional(),
  salon_name: z.string(),
  hero_slogan: z.string().optional(),
  hero_description: z.string().optional(),
  hero_image_url: z.string().optional(),
  contact_phone: z.string(),
  contact_address: z.string(),
  contact_email_for_users: z.string().email(),
  available_times: z.object({
    lunes: z.array(z.object({ start: z.string(), end: z.string() })),
    martes: z.array(z.object({ start: z.string(), end: z.string() })),
    miercoles: z.array(z.object({ start: z.string(), end: z.string() })),
    jueves: z.array(z.object({ start: z.string(), end: z.string() })),
    viernes: z.array(z.object({ start: z.string(), end: z.string() })),
    sabado: z.array(z.object({ start: z.string(), end: z.string() })),
    domingo: z.array(z.object({ start: z.string(), end: z.string() })),
  }),
  gallery_items: z.array(z.any()).optional(),
  services: z.array(serviceSchema).optional(),
  payment_methods: z.object({
    cash: z.boolean(),
    credit_card: z.boolean(),
    debit_card: z.boolean(),
    bank_transfer: z.boolean(),
  }),
  social_media: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    tiktok: z.string().optional(),
  }),
  color_primary: z.string(),
  color_secondary: z.string(),
  color_text_dark: z.string(),
  color_text_light: z.string(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

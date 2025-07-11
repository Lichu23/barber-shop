import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z.string().min(3, "El nombre es obligatorio"),
  phoneNumber: z
    .string()
    .min(11, "El número debe tener mínimo 11 números")
    .regex(/^\d+$/, "Solo números"),
  email: z.string().email("Correo Invalido").min(5, "El correo es obligatorio"),
  services: z.array(z.string()).min(1, "Selecciona al menos un servicio"),
  date: z.string().nonempty("Selecciona una fecha"),
  time: z.string().nonempty("Selecciona un horario")
});

export type FormValues = z.infer<typeof reservationSchema>;

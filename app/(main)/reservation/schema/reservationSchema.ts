import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z.string().min(3, "El nombre es obligatorio"),

  phoneNumber: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => val.length >= 9,
      "El número debe tener al menos 9 dígitos."
    )
    .refine((val) => /^\d+$/.test(val), "Solo números después de limpiar."),

  email: z.coerce
    .string({
      invalid_type_error: "El correo debe ser un texto",
    })
    .trim()
    .email("Correo Invalido")
    .min(5, "El correo es obligatorio"),

  services: z.array(z.string()).min(1, "Selecciona al menos un servicio"),

  date: z
    .string()
    .nonempty("Selecciona una fecha")
    .refine(
      (dateString) => {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      },
      {
        message: "La fecha no puede ser anterior al día de hoy.",
      }
    ),

  time: z.string().nonempty("Selecciona un horario"),
});

export type FormValues = z.infer<typeof reservationSchema>;

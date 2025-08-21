"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { OnboardingFormValues, onboardingSchema } from "../schemaOnboarding";
import { FormInput } from "./FormInput";
import { DaySchedule } from "./DaySchedule";
import GalleryFieldArray from "./GalleryFieldArray";
import ServicesFieldArray from "./ServicesFieldArray";

export default function OnboardingClientForm() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      tenant_id: "",
      salon_name: "",
      hero_slogan: "",
      hero_description: "",
      hero_image_url: "",
      contact_phone: "",
      contact_address: "",
      contact_email_for_users: "",
      available_times: {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
        domingo: [],
      },
      gallery_items: [""],
      services: [{ name: "", description: "", price: undefined }],
      payment_methods: {
        cash: false,
        credit_card: false,
        debit_card: false,
        bank_transfer: false,
      },
      social_media: {
        instagram: "",
        facebook: "",
        twitter: "",
        tiktok: "",
      },
      color_primary: "#000000",
      color_secondary: "#ffffff",
      color_text_dark: "#000000",
      color_text_light: "#ffffff",
    },
  });

  const galleryArray = useFieldArray({
    control,
    name: "gallery_items",
  });

  const servicesArray = useFieldArray({
    control,
    name: "services",
  });

  type DayKey = keyof OnboardingFormValues["available_times"];
  const days: DayKey[] = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  const timeArrays: Record<
    DayKey,
    ReturnType<typeof useFieldArray<OnboardingFormValues>>
  > = {
    lunes: useFieldArray({ control, name: "available_times.lunes" }),
    martes: useFieldArray({ control, name: "available_times.martes" }),
    miercoles: useFieldArray({ control, name: "available_times.miercoles" }),
    jueves: useFieldArray({ control, name: "available_times.jueves" }),
    viernes: useFieldArray({ control, name: "available_times.viernes" }),
    sabado: useFieldArray({ control, name: "available_times.sabado" }),
    domingo: useFieldArray({ control, name: "available_times.domingo" }),
  };

  async function onSubmit(data: OnboardingFormValues) {
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error:", result);
        alert("Hubo un error validando o guardando los datos.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Error enviando formulario:", err);
      alert("Error inesperado. Intente de nuevo.");
    }
  }

  return (
    <div className="bg-gradient-to-br from-sky-100 via-slate-50 to-sky-200">
      <div className="max-w-3xl mx-auto p-6 ">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4">
          Datos de tu salón
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre del salón */}
          <FormInput
            label="Nombre del salon"
            name="salon_name"
            register={register}
            error={errors.salon_name}
          />

          {/* Hero */}
          <FormInput
            label="Slogan"
            name="hero_slogan"
            register={register}
            error={errors.hero_slogan}
          />
          <div>
            <label
              htmlFor="Hero description"
              className="block font-bold mb-1"
            >
              Descripción Hero
            </label>
            <textarea
              id="Hero description"
              className="border rounded px-3 py-2 w-full"
              rows={3}
              {...register("hero_description")}
            />
          </div>
          <FormInput
            label="Hero Image URL"
            name="hero_image_url"
            register={register}
            error={errors.hero_image_url}
          />

          {/* Contacto */}
          <FormInput
            label="Telefono"
            name="contact_phone"
            register={register}
            error={errors.contact_phone}
          />
          <FormInput
            label="Direccion"
            name="contact_address"
            register={register}
            error={errors.contact_address}
          />
          <FormInput
            label="Email de contacto"
            name="contact_email_for_users"
            register={register}
            error={errors.contact_email_for_users}
          />

          {/* Horarios por día */}
          <DaySchedule
            days={days}
            timeArrays={timeArrays}
            register={register}
          />

          {/* Galería */}
          <GalleryFieldArray
            label="Galeria"
            placeholder="URL de imagen"
            fieldArray={galleryArray}
            register={register}
          />

          {/* Servicios */}
          <ServicesFieldArray
            label="Servicios"
            fieldArray={servicesArray}
            register={register}
          />

          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-400 text-white mt-5 px-4 py-2 rounded"
            >
              Enviar Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

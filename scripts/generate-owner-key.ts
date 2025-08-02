import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs/promises";

import type { HaircutType } from "@/constants/gallery";
import type { ServiceOption } from "@/constants/services";

dotenv.config({ path: ".env.local" });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey: string | undefined =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error("Faltan variables de entorno de Supabase.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

interface SalonDataFromFile {
  tenant_id: string;
  salon_name: string;
  hero_slogan: string;
  hero_description: string;
  hero_image_url: string;
  contact_phone: string;
  contact_address: string;
  opening_hours_summary: string;
  opening_hours_detail: string;
  contact_email_for_users: string;
  gallery_items: Omit<HaircutType, "id" | "tenant_id" | "created_at">[];
  services: Omit<ServiceOption, "id" | "tenant_id" | "created_at">[];
}

async function generateAndInsertOwnerKey(
  jsonFilePath: string
): Promise<string | null> {
  if (!jsonFilePath) {
    console.error(
      "Uso: pnpm run generate-key <ruta_al_archivo_json_del_salon>"
    );
    console.error(
      "Ejemplo: pnpm run generate-key salon-data-json/chiky-peluqueria.json"
    );
    process.exit(1);
  }

  let salonData: SalonDataFromFile;

  try {
    const fileContent = await fs.readFile(jsonFilePath, "utf-8");
    salonData = JSON.parse(fileContent);
  } catch (err: any) {
    console.error(
      `Error al leer o parsear el archivo JSON '${jsonFilePath}':`,
      err.message
    );
    process.exit(1);
  }

  const {
    tenant_id,
    salon_name,
    gallery_items,
    services,
    ...tenantProfileDetails
  } = salonData;

  if (!tenant_id || !salon_name) {
    console.error(
      "Error: El archivo JSON debe contener al menos 'tenant_id' y 'salon_name'."
    );
    process.exit(1);
  }

  const { data: existingTenantProfile, error: existingProfileError } =
    await supabase
      .from("tenants")
      .select("tenant_id")
      .eq("tenant_id", tenant_id)
      .single();

  if (existingProfileError && existingProfileError.code !== "PGRST116") {
    // PGRST116 = No rows found
    console.error("Error al verificar tenant existente:", existingProfileError);
    process.exit(1);
  }
  if (existingTenantProfile) {
    console.error(
      `Error: Ya existe un perfil para el tenantId: ${tenant_id}. No se puede crear de nuevo.`
    );
    console.error(
      `Si quieres actualizar, hazlo manualmente en Supabase o crea un script de actualización.`
    );
    process.exit(1);
  }

  const newOwnerSecretKey = uuidv4();

  try {
    //1. insertar tenantId en la tabla tenants
    const { error: tenantInsertError } = await supabase
      .from("tenants")
      .insert([
        {
          tenant_id: tenant_id,
          salon_name: salon_name || tenant_id,
          ...tenantProfileDetails,
        },
      ])
      .select();

    if (tenantInsertError) {
      console.error("Error al insertar perfil de tenant:", tenantInsertError);
      process.exit(1);
    }

    //1. insertar tenantId en la tabla admin_settings
    const { data, error: adminSettingsInsertError } = await supabase
      .from("admin_settings")
      .insert([
        {
          owner_secret_key: newOwnerSecretKey,
          tenant_id: tenant_id,
          google_refresh_token: null,
          google_calendar_id: null,
        },
      ])
      .select("owner_secret_key");

    if (!data) {
      console.log(
        `Hubo un error al obtener la data: ${adminSettingsInsertError}`
      );
      throw new Error("Hubo un error linea 82 al traer la data");
    }

    if (adminSettingsInsertError) {
      console.error(
        "Error al insertar configuración de Owner en 'admin_settings':",
        adminSettingsInsertError
      );
      process.exit(1);
    }

    const generatedKey: string = data[0].owner_secret_key;
    console.log(
      `Configuración de Owner creada en 'admin_settings' para tenantId: ${tenant_id}.`
    );

    if (gallery_items && gallery_items.length > 0) {
      console.log(
        `Insertando ${gallery_items.length} ítems de galería para '${tenant_id}'...`
      );
      const galleryItemsToInsert = gallery_items.map((item) => ({
        ...item,
        tenant_id: tenant_id, // Asignar el tenantId a cada ítem de galería
      }));
      const { error: galleryInsertError } = await supabase
        .from("salon_gallery_items")
        .insert(galleryItemsToInsert);
      if (galleryInsertError) {
        console.error(
          "Error al insertar ítems de galería:",
          galleryInsertError
        );
      } else {
        console.log(`Ítems de galería insertados correctamente.`);
      }
    } else {
      console.log(
        `No hay ítems de galería definidos en el JSON para '${tenant_id}'.`
      );
    }

    if (services && services.length > 0) {
      console.log(
        `Insertando ${services.length} servicios para '${tenant_id}'...`
      );
      const servicesToInsert = services.map((item) => ({
        ...item,
        tenant_id: tenant_id, // Asignar el tenantId a cada servicio
      }));
      const { error: servicesInsertError } = await supabase
        .from("salon_services")
        .insert(servicesToInsert);
      if (servicesInsertError) {
        console.error("Error al insertar servicios:", servicesInsertError);
      } else {
        console.log(`Servicios insertados correctamente.`);
      }
    } else {
      console.log(`No hay servicios definidos en el JSON para '${tenant_id}'.`);
    }

    console.log(
      `¡Configuración de Owner y Perfil de Tenant creados para tenantId: ${tenant_id}!`
    );
    console.log(`Owner Secret Key: ${generatedKey}`);
    console.log(
      `URL de Configuración para el Owner: ${process.env.NEXT_PUBLIC_BASE_URL}/${tenant_id}/setup-calendar?key=${generatedKey}`
    );

    return generatedKey;
  } catch (err: any) {
    console.error("Excepción al generar e insertar la clave:", err);
    return null;
  }
}

// Para ejecutarlo desde la línea de comandos: npm run generate-key mi-salon-de-prueba "Mi Salón de Prueba SL"
const args = process.argv.slice(2);
const jsonFilePathArg = args[0]; 

if (!jsonFilePathArg) {
  console.error("Uso: pnpm run generate-key <ruta_al_archivo_json_del_salon>");
  console.error(
    "Ejemplo: npm run generate-key salon-data-json/chiky-peluqueria.json"
  );
  process.exit(1);
}

generateAndInsertOwnerKey(jsonFilePathArg)
  .then(() => {
    console.log("Script finalizado.");
  })
  .catch((error) => {
    console.error("El script terminó con un error:", error);
    process.exit(1);
  });

  //http://localhost:3000/chiky-peluqueria/setup-calendar?key=1234-1234-1234-1234
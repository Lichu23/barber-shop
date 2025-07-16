import { v4 as uuidv4 } from "uuid"
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Faltan variables de entorno de Supabase.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateAndInsertOwnerKey() {
  const newOwnerSecretKey = uuidv4(); // Genera un UUID único

  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .insert([
        { owner_secret_key: newOwnerSecretKey, google_refresh_token: null, google_calendar_id: null }
      ]);

    if (error) {
      console.error('Error al insertar la nueva clave de Owner:', error);
      return null;
    }

    console.log(`¡Clave de Owner generada e insertada exitosamente!`);
    console.log(`Owner Secret Key: ${newOwnerSecretKey}`);
    console.log(`URL de Configuración para el Owner: http://localhost:3000/setup-calendar?key=${newOwnerSecretKey}`);
    console.log(`\n¡Copia esta URL y envíasela al Owner!`);
    return newOwnerSecretKey;

  } catch (err) {
    console.error('Excepción al generar e insertar la clave:', err);
    return null;
  }
}

generateAndInsertOwnerKey();
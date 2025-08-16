import { createServerSupabaseClient } from "@/utils/supabase/createClient";
interface OnboardingData {
  tenant_id: string;
  salon_name: string;
  hero_slogan: string;
  hero_description: string;
  hero_image_url: string;
  contact_phone: string;
  contact_address: string;
  contact_email_for_users: string;
  available_times: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  gallery_items: string[];
  services: {
    name: string;
    description: string;
    price: number;
  }[];
}
export interface User {
  id: string;
  clerk_user_id: string;
  email?: string;
  tenant_id: string;
  name?: string;
  status?: string;
  onboarding_data?: OnboardingData;
}

const supabase = createServerSupabaseClient();

export async function getUserByClerkId(
  clerkUserId: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from("tenants_onboarding")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

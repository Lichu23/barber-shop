import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/utils/supabase/createClient";
import OnboardingClientForm from "./components/OnboardingClientForm";
import { getUserByClerkId } from "@/lib/services/clerkServices";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-up");

  const user = await getUserByClerkId(userId);
  if (!user) redirect("/sign-up");

  const supabase = createServerSupabaseClient();
  const { data: record } = await supabase
    .from("tenants_onboarding")
    .select("onboarding_data")
    .eq("clerk_user_id", userId)
    .single();

  if (record?.onboarding_data) {
    redirect("/dashboard");
  }

  return <OnboardingClientForm />;
}

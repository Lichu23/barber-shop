import { getUserByClerkId } from "@/lib/services/clerkServices";
import { Booking } from "@/types/booking";
import { groupBookingsByMonth } from "@/utils/monthlyBookings";
import { createServerSupabaseClient } from "@/utils/supabase/createClient";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AccountData from "./components/AccountData";
import MonthlySummary from "./components/MonthlySummary";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-up");

  const user = await getUserByClerkId(userId);
  if (!user) redirect("/sign-up");

  if (!user.onboarding_data) redirect("/onboarding");
  console.log('probando commit')
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bookings") 
    .select("*")
    .eq("tenant_id", user.tenant_id);

  if (error) throw new Error("Error obteniendo reservas");

  const bookings: Booking[] | null = data;
  const monthlySummary = bookings ? groupBookingsByMonth(bookings) : [];

  return (
    <div className="w-full h-dvh px-4 lg:px-20 flex flex-col items-center">
      <h1 className="text-center font-bold text-2xl lg:text-5xl mt-20 mb-6 lg:mb-10">
        Bienvenido {user?.name || "usuario"}
      </h1>

      <div className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-20 w-full">
        <AccountData user={user} />
        <MonthlySummary monthlySummary={monthlySummary} />
      </div>
    </div>
  );
}

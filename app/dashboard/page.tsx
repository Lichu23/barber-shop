import { getUserByClerkId } from "@/lib/services/clerkServices";
import { Booking } from "@/types/booking";
import { groupBookingsByMonth } from "@/utils/monthlyBookings";
import { createServerSupabaseClient } from "@/utils/supabase/createClient";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AccountData from "./components/AccountData";
import MonthlySummary from "./components/MonthlySummary";
import { EarningsChart } from "./components/EarningsChart";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-up");

  const user = await getUserByClerkId(userId);
  if (!user) redirect("/sign-up");

  if (!user.onboarding_data) redirect("/onboarding");

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("tenant_id", user.tenant_id);

  if (error) throw new Error("Error obteniendo reservas");

  const bookings: Booking[] | null = data;
  const monthlySummary = bookings ? groupBookingsByMonth(bookings) : [];
  const chartData = monthlySummary.map((m) => ({
    month: m.month,
    earnings: m.totalEarnings,
  }));

  console.log(`User ID: ${userId}`);

  return (
    <div className="w-full h-full flex justify-center bg-slate-100 p-2">
      <div className="opacity-0 translate-y-4 animate-fade-in lg:w-[53%]">
        <h1 className="text-center font-bold text-2xl lg:text-5xl mt-10 lg:mt-20 mb-6 lg:mb-10">
          Bienvenido,{" "}
          <span className="text-sky-700">
            {user.name || user.email || "usuario"}
          </span>
        </h1>

        <div className="lg:flex lg:justify-center lg:items-center lg: gap-10">
          <AccountData user={user} />
          <MonthlySummary
            monthlySummary={monthlySummary}
            bookings={bookings || []}
          />
        </div>
        <div className="flex justify-center items-center">
          <EarningsChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

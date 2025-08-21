
import { User } from "@/lib/services/clerkServices";
import { MonthlySummaryType } from "@/utils/monthlyBookings";
import AccountData from "./AccountData";
import MonthlySummary from "./MonthlySummary";


interface DashboardClientProps {
  user: User;
  monthlySummary: MonthlySummaryType[];
}

export default function DashboardClient({
  user,
  monthlySummary,
}: DashboardClientProps) {


  return (
    <div className="w-full h-dvh px-4 lg:px-20 flex flex-col items-center">
      <h1 className="text-center font-bold text-2xl lg:text-5xl mt-20 mb-6 lg:mb-10">
        Bienvenido {user.name || "usuario"}
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-20 w-full">
        <AccountData user={user} />
        <MonthlySummary monthlySummary={monthlySummary} />
      </div>
    </div>
  );
}

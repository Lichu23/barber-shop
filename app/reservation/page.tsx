import { ReservationView } from "./components/ReservationView";
import { ReservationProvider } from "./context/ReservationProvider";

export default function Reservation() {
  return (
    <>
      <ReservationProvider>
        <ReservationView />
      </ReservationProvider>
    </>
  );
}

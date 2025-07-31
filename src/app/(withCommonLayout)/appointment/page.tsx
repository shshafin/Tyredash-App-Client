import { Metadata } from "next";
import AppointmentBookingPage from "./_components/appointment-page";
export const metadata: Metadata = {
  title: "Appointment",
};

const page = () => {
  return <AppointmentBookingPage />;
};

export default page;

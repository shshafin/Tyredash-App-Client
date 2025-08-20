import { getAllSupportRequests } from "@/src/services/fleet-support";
import FleetSupportTable from "./_components/FleetSupportTable";

export default async function FleetSupport() {
  return (
    <div>
      <FleetSupportTable />
    </div>
  );
}

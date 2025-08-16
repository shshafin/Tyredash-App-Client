import { Suspense } from "react";
import CreateFleetNewsForm from "./_components/CreateFleetNewsForm";
import CreateFleetNewsFormLoading from "./_components/CreateFleetNewsFormLoading";

export default function CreateFleetNewsPage() {
  return (
    <div>
      <Suspense fallback={<CreateFleetNewsFormLoading />}>
        <CreateFleetNewsForm />
      </Suspense>
    </div>
  );
}

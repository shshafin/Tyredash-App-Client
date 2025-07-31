import TireDetailPage from "../_components/TireDetailPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <TireDetailPage params={resolvedParams} />
    </div>
  );
};

export default Page;

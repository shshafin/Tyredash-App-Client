import DealAllWheels from "../_components/deal-all-wheels";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <DealAllWheels params={resolvedParams} />
    </div>
  );
};

export default Page;

import DealAllTires from "../_components/deal-all-tires";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <DealAllTires params={resolvedParams} />
    </div>
  );
};

export default Page;

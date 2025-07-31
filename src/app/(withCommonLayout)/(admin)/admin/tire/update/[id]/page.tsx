import UpdateTirePage from "../../_components/UpdateTirePage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <UpdateTirePage params={resolvedParams} />
    </div>
  );
};

export default Page;

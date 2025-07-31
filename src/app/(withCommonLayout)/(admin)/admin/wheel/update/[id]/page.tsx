import UpdateWheelPage from "../../_components/UpdateWheelPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <UpdateWheelPage params={resolvedParams} />
    </div>
  );
};

export default Page;

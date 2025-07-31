import WheelDetailPage from "../_components/WheelDetailPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <WheelDetailPage params={resolvedParams} />
    </div>
  );
};

export default Page;

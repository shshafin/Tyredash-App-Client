import SingleWheelPage from "../_components/single-wheel-page";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <SingleWheelPage params={resolvedParams} />
    </div>
  );
};

export default Page;

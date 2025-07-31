import SingleTirePage from "../_components/single-tire-page";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <SingleTirePage params={resolvedParams} />
    </div>
  );
};

export default Page;

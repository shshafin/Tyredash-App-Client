import SingleDealsPage from "./_components/single-deal-page";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <SingleDealsPage params={resolvedParams} />
    </div>
  );
};

export default Page;

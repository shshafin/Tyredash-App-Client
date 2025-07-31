import Image from "next/image";

const blogData = [
  {
    id: 1,
    title: "Top Tips to Maintain Your Tires",
    description:
      "Extend the life of your tires with essential maintenance advice.",
    image: "/deals.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Choosing the Right Wheels for Your Vehicle",
    description: "Upgrade or replace your wheels with confidence and style.",
    image: "/deals.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Tire Safety: What You Need to Know",
    description: "Stay safe with these essential tire safety tips.",
    image: "/deals.jpg",
    link: "#",
  },
];

const BlogSection = () => {
  return (
    <section className="flex flex-col items-center px-4 py-12 ">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10">
        Learn About Tires and Wheels
      </h2>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative group">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="absolute inset-0  group-hover:bg-black/50 transition duration-300"></div>
            </div>
            <div className="p-5 flex flex-col justify-between h-48">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
              <a
                href={post.link}
                className="text-red-500 font-semibold hover:text-red-600 transition self-end"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;

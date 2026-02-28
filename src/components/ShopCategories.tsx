import Image from "next/image";
import Link from "next/link";
import data from "@/assets/data.json";

export default function ShopCategories() {
  const categoriesData = data.categories;
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <span className="text-[#fdb61b] text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Discover Your Scent</span>
          <h2 className="font-sans text-3xl md:text-5xl text-gray-900 font-bold">Shop by Category</h2>
          <div className="w-16 h-0.5 bg-[#fdb61b] mx-auto mt-6"></div>
        </div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group flex flex-col items-center w-[60vw] sm:w-[45vw] md:w-auto shrink-0 transition-all duration-500 snap-center"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative w-full aspect-square mb-5 overflow-hidden rounded-full shadow-sm group-hover:shadow-xl group-hover:border-[#fdb61b]/30 transition-all duration-500 rounded-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-top p-4 group-hover:scale-110 transition-transform duration-700 ease-out rounded-full"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>

              {/* Category Name */}
              <div className="text-center">
                <h3 className="font-sans text-xs md:text-sm font-extrabold text-gray-900 tracking-[0.15em] uppercase group-hover:text-[#fdb61b] transition-colors duration-300">
                  {category.name}
                </h3>
                <div className="w-0 group-hover:w-full h-[1px] bg-[#fdb61b] mx-auto mt-1 transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

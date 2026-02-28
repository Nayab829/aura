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
              className="relative block w-[50vw] sm:w-[45vw] md:w-auto shrink-0 aspect-[4/4] rounded-xl overflow-hidden transition-all duration-500  snap-center"
            >


              {/* Image Container */}
              <div className="relative w-full h-full ">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-top p-4 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 pointer-events-none rounded-full"
                />
              </div>


            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

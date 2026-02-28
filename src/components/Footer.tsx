import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-white py-20 border-t border-white/5" id="contact">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#fdb61b] font-sans font-bold text-2xl tracking-widest uppercase mb-4">
            <span className="logo-mark-footer">&#9769;</span>
            <span>Aura Sentiments</span>
          </div>
          <p className="text-white/60 text-[0.95rem] leading-[1.7]">Pakistan's No.1 brand in non-alcoholic attars since 2018. Premium fragrances crafted with passion and heritage.</p>
        </div>

        <div className="hidden md:block">
          <h4 className="text-white font-bold text-[1.1rem] uppercase tracking-wider mb-8">Quick Links</h4>
          <ul className="space-y-4">
            <li><a href="#best-sellers" className="text-white/50 hover:text-[#fdb61b] transition-colors text-[0.95rem]">Best Sellers</a></li>
            <li><a href="#mens" className="text-white/50 hover:text-[#fdb61b] transition-colors text-[0.95rem]">Men's Attars</a></li>
            <li><a href="#womens" className="text-white/50 hover:text-[#fdb61b] transition-colors text-[0.95rem]">Women's Attars</a></li>
            <li><a href="#gift" className="text-white/50 hover:text-[#fdb61b] transition-colors text-[0.95rem]">Gift Sets</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-[1.1rem] uppercase tracking-wider mb-8">Get in Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-white/50 text-[0.95rem]">
              <span className="text-[#fdb61b]">📞</span>
              <a href="tel:+923001234567" className="hover:text-[#fdb61b] transition-colors">+92 300 123 4567</a>
            </li>
            <li className="flex items-center gap-4 text-white/50 text-[0.95rem]">
              <span className="text-[#fdb61b]">✉</span>
              <a href="mailto:info@aurasentimentspakistan.com" className="hover:text-[#fdb61b] transition-colors">info@aurasentimentspakistan.com</a>
            </li>
            <li className="flex items-center gap-4 text-white/50 text-[0.95rem]">
              <span className="text-[#fdb61b]">📍</span>
              <span>Shop 12, Anarkali Bazaar, Lahore</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-8 mt-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-[0.85rem]">
          <p>&copy; {new Date().getFullYear()} Aura Sentiments. All rights reserved.</p>
          <p className="bg-white/5 px-4 py-1 rounded-full border border-white/10">Cards, COD & EasyPaisa Accepted</p>
        </div>
      </div>
    </footer>
  );
}

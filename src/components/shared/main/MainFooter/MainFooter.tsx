import { Facebook, Github, Instagram, Mail, Phone, Send, Youtube } from 'lucide-react';
import Link from 'next/link';

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#020617] pt-24 pb-10">
      {/* Background Decorative Elements - Subtle Blue Glow */}
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#DB1A1A]/30 to-transparent"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#DB1A1A]/5 blur-[120px]"></div>
      <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[#DB1A1A]/5 blur-[120px]"></div>

      <div className="relative z-10 mx-auto max-w-400 px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand & Newsletter Section */}
          <div className="space-y-10 lg:col-span-5">
            <div className="space-y-5">
              <Link
                href="/"
                className="text-4xl font-black tracking-tighter text-white uppercase italic"
              >
                Next<span className="text-[#DB1A1A]">Film</span>
              </Link>
              <p className="max-w-sm text-base leading-relaxed text-gray-400">
                The ultimate destination for cinephiles. Stream high-quality movies and TV shows
                anytime, anywhere. Experience cinema in the best way possible.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-[0.2em] text-white uppercase">
                Newsletter
              </h4>
              <div className="relative max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pr-14 pl-6 text-sm text-white transition-all outline-none focus:border-[#DB1A1A]/50 focus:ring-4 focus:ring-[#DB1A1A]/10"
                />
                <button className="absolute top-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#DB1A1A] text-white shadow-lg shadow-[#DB1A1A]/20 transition-all hover:scale-105 active:scale-95">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase">
                Platform
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Browse', 'Trending', 'My List', 'Premium'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="inline-block transition-all hover:translate-x-1 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['About Us', 'Privacy Policy', 'Terms of Use', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="inline-block transition-all hover:translate-x-1 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-2 space-y-6 sm:col-span-1">
              <h4 className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase">
                Connect
              </h4>
              <div className="space-y-5 text-sm text-gray-400">
                <div className="group flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-blue-500 transition-all group-hover:bg-[#DB1A1A] group-hover:text-white">
                    <Mail size={18} />
                  </div>
                  <span className="text-xs">hello@nextfilm.com</span>
                </div>
                <div className="group flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-blue-500 transition-all group-hover:bg-[#DB1A1A] group-hover:text-white">
                    <Phone size={18} />
                  </div>
                  <span className="text-xs">+880 1234 5678</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 flex flex-col items-center justify-between border-t border-white/5 pt-10 md:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} <span className="text-white">NextFilm</span>. All Rights Reserved.
          </p>

          <div className="mt-6 flex items-center gap-4 md:mt-0">
            {[Facebook, Github, Instagram, Youtube].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-[#DB1A1A]/50"
              >
                <div className="absolute inset-0 translate-y-full bg-[#DB1A1A] transition-transform duration-300 group-hover:translate-y-0"></div>
                <Icon
                  size={20}
                  className="relative z-10 transition-colors duration-300 group-hover:text-white"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

// 'use client';

// import { ChevronRight, Loader2 } from 'lucide-react';
// import { useEffect, useState } from 'react';

// interface Movie {
//   id: number;
//   poster_path: string;
//   title: string;
// }

// export default function TopTenSection() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopMovies = async () => {
//       try {

//         const API_KEY = 'c3d501df0f1a58320fd0dbb0719f4891';
//         const response = await fetch(
//           `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
//         );
//         const data = await response.json();

//
//         setMovies(data.results.slice(0, 10));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching top 10:', error);
//         setLoading(false);
//       }
//     };

//     fetchTopMovies();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-60 items-center justify-center bg-[#020617]">
//         <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <section className="overflow-hidden bg-[#020617] py-20">
//       <div className="container mx-auto px-6">
//         {/* Header */}
//         <div className="mb-10 flex items-center justify-between">
//           <div className="space-y-1">
//             <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
//               Top 10 <span className="text-blue-600">This Week</span>
//             </h2>
//             <div className="h-1 w-20 rounded-full bg-blue-600"></div>
//           </div>
//           <button className="group flex items-center gap-2 text-xs font-bold text-gray-500 transition-all hover:text-white">
//             SEE ALL{' '}
//             <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//           </button>
//         </div>

//         {/* Dynamic List */}
//         <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-10">
//           {movies.map((movie, index) => (
//             <div
//               key={movie.id}
//               className="group relative flex flex-shrink-0 cursor-pointer items-end"
//             >
//               {/* Large Number Background */}
//               <span className="stroke-text text-[180px] leading-[0.8] font-black text-transparent transition-all duration-500 select-none group-hover:text-blue-600/30">
//                 {index + 1}
//               </span>

//               {/* Poster Image */}
//               <div className="mb-6 -ml-16 h-64 w-44 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-3 group-hover:border-blue-500/50">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   className="h-full w-full object-cover"
//                   alt={movie.title}
//                 />
//                 {/* Overlay on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .stroke-text {
//           -webkit-text-stroke: 3px rgba(255, 255, 255, 0.15);
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         /* For mobile smooth scrolling */
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }

import { Facebook, Github, Instagram, Mail, Phone, Send, Youtube } from 'lucide-react';
import Link from 'next/link';

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#020617] pt-20 pb-10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"></div>
      <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]"></div>

      <div className="relative z-10 mx-auto max-w-400 px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand & Newsletter Section (5 columns) */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <Link
                href="/"
                className="text-3xl font-black tracking-tighter text-white uppercase italic"
              >
                Next<span className="text-blue-600">Film</span>
              </Link>

              <p className="mt-2 max-w-sm text-base leading-relaxed text-gray-400">
                The ultimate destination for cinephiles. Stream high-quality movies and TV shows
                anytime, anywhere.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold tracking-widest text-white uppercase">
                Subscribe to Newsletter
              </h4>
              <div className="relative max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-white/10 bg-white/5 py-3 pr-12 pl-5 text-sm text-white ring-blue-500/50 transition-all outline-none focus:border-blue-500 focus:ring-4"
                />
                <button className="absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white transition-transform hover:scale-110 active:scale-95">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Links Section (7 columns) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold tracking-widest text-white uppercase">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['Browse', 'Trending', 'My List', 'Premium', 'Live TV'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="transition-all hover:pl-1 hover:text-blue-500">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold tracking-widest text-white uppercase">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['About Us', 'Careers', 'Privacy', 'Terms', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="transition-all hover:pl-1 hover:text-blue-500">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-2 space-y-6 sm:col-span-1">
              <h4 className="text-sm font-bold tracking-widest text-white uppercase">Contact</h4>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-blue-500">
                    <Mail size={16} />
                  </div>
                  <span>hello@nextfilm.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-blue-500">
                    <Phone size={16} />
                  </div>
                  <span>+8801770365981</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/5 pt-10 md:flex-row">
          <div className="order-2 mt-8 md:order-1 md:mt-0">
            <p className="text-xs text-gray-500">
              © {currentYear} NextFilm. Crafted by{' '}
              <span className="cursor-pointer text-blue-500 hover:underline">Creative Minds</span>.
            </p>
          </div>

          {/* Social Icons with a Modern Border Style */}
          <div className="order-1 flex items-center gap-3 md:order-2">
            {[Facebook, Github, Instagram, Youtube].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:text-white"
              >
                <div className="absolute inset-0 translate-y-10 bg-blue-600 transition-transform duration-300 group-hover:translate-y-0"></div>
                <Icon size={18} className="relative z-10" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

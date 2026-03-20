'use client';

import { ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020617] px-6 text-center">
      {/* Background Cinematic Grain & Light Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DB1A1A]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Animated 404 Text */}
        <h1 className="relative text-[12rem] leading-none font-black tracking-tighter text-white opacity-5 md:text-[20rem]">
          404
        </h1>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="mb-2 text-xs font-black tracking-[0.5em] text-blue-500 uppercase">
            Scene Not Found
          </p>
          <h2 className="text-4xl font-black text-white uppercase italic md:text-6xl">
            Lost in <span className="text-[#DB1A1A]">Space?</span>
          </h2>
          <p className="mt-4 max-w-md text-sm font-medium text-gray-500">
            The movie or page you are looking for has been deleted from the script or never existed
            in this universe.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={() => router.back()}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95"
        >
          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          GO BACK
        </button>

        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#DB1A1A] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#DB1A1A]/20 transition-all hover:bg-blue-700 active:scale-95"
        >
          <Home size={18} />
          BACK TO HOME
        </Link>
      </div>

      {/* Decorative Search Link */}
      <div className="relative z-10 mt-10">
        <p className="text-xs text-gray-600">
          Try searching for something else?
          <Link
            href="/"
            className="ml-2 text-blue-500 underline underline-offset-4 hover:text-blue-400"
          >
            Search Movies
          </Link>
        </p>
      </div>

      {/* Bottom Visual Element: Film Strip Style */}
      <div className="absolute bottom-10 left-0 flex w-full justify-around opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 w-24 rounded-lg border-2 border-dashed border-white" />
        ))}
      </div>
    </main>
  );
}

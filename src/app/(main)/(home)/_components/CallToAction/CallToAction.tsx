'use client';
import { Mail, Send, Sparkles, Ticket } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020617] py-12">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-900/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-400 px-4">
        {/* Ticket Styled Container */}
        <div className="relative overflow-hidden rounded-2xl border-white/5 bg-linear-to-br from-white/4 to-transparent backdrop-blur-sm">
          {/* --- Ticket Notch Effects (The Cutouts) --- */}
          {/* Left Notch */}
          <div className="absolute top-1/2 -left-6 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-[#020617] ring-1 ring-white/5 md:block" />
          {/* Right Notch */}
          <div className="absolute top-1/2 -right-6 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-[#020617] ring-1 ring-white/5 md:block" />

          {/* Top Decorative Border Line */}
          <div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
            {/* Left Content Area */}
            <div className="flex flex-col justify-center space-y-6 border-b border-dashed border-white/10 p-8 md:p-16 lg:border-r lg:border-b-0 lg:p-20">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-500">
                <Ticket size={16} className="-rotate-12" />
                <span>LIMITED VIP ACCESS</span>
              </div>

              <h2 className="text-4xl leading-tight font-black text-white md:text-5xl lg:text-6xl">
                Get Your <br />
                <span className="bg-linear-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent italic">
                  Digital Pass
                </span>
              </h2>

              <p className="max-w-md text-lg leading-relaxed text-gray-400">
                Join our premium community. Be the first to receive secret trailers, early bird
                tickets, and cinematic updates.
              </p>
            </div>

            {/* Right Form Area (The Subscription Ticket) */}
            <div className="relative flex flex-col justify-center bg-blue-600/2 p-8 md:p-16 lg:p-20">
              <div className="rounded-3xl border border-white/10 bg-[#020617]/40 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold tracking-tight text-white uppercase">
                    Newsletter Pass
                  </h4>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <Mail
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors focus-within:text-blue-500"
                      size={20}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 text-white ring-blue-600 transition-all outline-none focus:bg-white/8 focus:ring-2"
                    />
                  </div>

                  <button className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 py-4 font-black text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98]">
                    <span className="relative z-10 flex items-center gap-2 tracking-widest italic">
                      ACTIVATE NOW <Send size={18} />
                    </span>
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  </button>
                </form>

                {/* Member Proof */}
                <div className="mt-6 flex flex-col items-center gap-3 border-t border-white/5 pt-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-7 w-7 rounded-full border-2 border-[#020617] bg-gray-800 ring-1 ring-white/10"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    +2,400 members already inside
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "./hooks/use-outside-click";
import { cn } from "@/utils/lib/utils";
import courseData from "../data/music_courses.json";

type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
  image: string;
};

const cards = courseData.courses as Course[];

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const WAVE_COLORS = ["#4F8CFF", "#46A0F2", "#3DB4E5", "#33C8D8", "#22D3EE"];

export function ExpandableCard() {
  const [active, setActive] = useState<Course | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <style>{`
        @keyframes coursewave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.7); }
        }
        .wave-bar { animation: coursewave 0.85s ease-in-out infinite; transform-origin: bottom; }
      `}</style>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-full w-full z-10 bg-[#05070C]/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 flex items-start justify-center z-[100] p-4 pt-30 overflow-y-auto">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-[#EAF0FA] rounded-full h-8 w-8 z-10"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[520px] h-full md:h-fit md:max-h-[85vh] flex flex-col bg-[#121826] border border-[#23304A] sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/60 "
            >
              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="relative shrink-0"
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-72 object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#121826] to-transparent" />
                {active.isFeatured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#121826]/90 border border-[#23304A] px-3 py-1.5 text-xs text-[#8FC1FF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#22D3EE]" />
                    Featured
                  </div>
                )}
              </motion.div>

              <div className="flex flex-col overflow-hidden">
                <div className="flex justify-between items-start gap-4 p-6 pb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-[var(--font-display)] text-xl text-[#EAF0FA] tracking-tight"
                    >
                      {active.title}
                    </motion.h3>
                    <p className="mt-1 text-sm text-[#8B96AC] flex items-center gap-2">
                      <span>Taught by {active.instructor}</span>
                      <span className="text-[#3A4460]">·</span>
                      <span className="font-mono bg-gradient-to-r from-[#4F8CFF] to-[#22D3EE] bg-clip-text text-transparent">
                        {formatPrice(active.price)}
                      </span>
                    </p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.id}-${id}`}
                    href={`/courses/${active.slug}`}
                    target="_blank"
                    className="shrink-0 px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#22D3EE] text-[#05070C] hover:brightness-110 transition-[filter]"
                  >
                    Enroll
                  </motion.a>
                </div>

                <div className="px-6 pb-6 relative">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm leading-relaxed text-[#8B96AC] max-h-48 md:max-h-none overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none]"
                  >
                    {active.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full">
        {cards.map((card, index) => (
          <motion.li
            key={`card-${card.id}-${id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            className="list-none"
          >
            <motion.div
              layoutId={`card-${card.id}-${id}`}
              onClick={() => setActive(card)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(card);
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${card.title}`}
              className="group flex items-center gap-4 p-3 rounded-xl cursor-pointer border border-transparent hover:border-[#23304A] hover:bg-[#121826] focus-visible:outline-none focus-visible:border-[#4F8CFF] transition-colors"
            >
              <span className="hidden sm:block w-6 font-mono text-xs text-[#5A6478] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>

              <motion.div
                layoutId={`image-${card.id}-${id}`}
                className="shrink-0 overflow-hidden rounded-lg ring-1 ring-[#23304A] group-hover:ring-[#4F8CFF]/50 transition-[box-shadow]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-14 w-14 object-cover object-top"
                />
              </motion.div>

              <div className="min-w-0 flex-1">
                <motion.h3
                  layoutId={`title-${card.id}-${id}`}
                  className="font-[var(--font-display)] text-[15px] text-[#EAF0FA] truncate"
                >
                  {card.title}
                </motion.h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-[#8B96AC] truncate">
                    {card.instructor}
                  </p>
                  <span className="text-xs text-[#3A4460]">·</span>
                  <span className="font-mono text-xs bg-gradient-to-r from-[#4F8CFF] to-[#22D3EE] bg-clip-text text-transparent shrink-0">
                    {formatPrice(card.price)}
                  </span>
                  {card.isFeatured && (
                    <span className="flex items-center gap-1 text-[11px] text-[#8FC1FF] shrink-0">
                      <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#22D3EE]" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* mini waveform — idles subtly, "plays" on hover */}
              <div className="hidden sm:flex items-end gap-[3px] h-4 mr-1">
                {[6, 12, 8, 14, 9].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2.5px] rounded-full opacity-30 group-hover:opacity-90 group-hover:wave-bar"
                    style={{
                      height: `${h}px`,
                      backgroundColor: WAVE_COLORS[i],
                      animationDelay: `${i * 90}ms`,
                    }}
                  />
                ))}
              </div>

              <motion.span
                layoutId={`button-${card.id}-${id}`}
                className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#4F8CFF] group-hover:to-[#22D3EE] text-[#5A6478] group-hover:text-[#05070C] transition-colors shrink-0"
              >
                <ArrowIcon />
              </motion.span>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-[#05070C]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
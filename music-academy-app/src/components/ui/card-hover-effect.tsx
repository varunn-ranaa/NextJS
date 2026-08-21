
"use client"
import { cn } from "@/utils/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

import { useRef, useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Single overlay's position/size + visibility, instead of mounting
  // a separate motion.span per card (which caused the unmount/remount blink).
  const [box, setBox] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const moveToIndex = (idx: number) => {
    const container = containerRef.current;
    const el = itemRefs.current[idx];
    if (!container || !el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setBox({
      top: elRect.top - containerRect.top,
      left: elRect.left - containerRect.left,
      width: elRect.width,
      height: elRect.height,
      opacity: 1,
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
      onMouseLeave={() => setBox((b) => ({ ...b, opacity: 0 }))}
    >
      <motion.div
        className="absolute bg-neutral-200 dark:bg-slate-800/[0.8] rounded-3xl pointer-events-none"
        animate={{
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height,
          opacity: box.opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 32,
          mass: 0.8,
          opacity: { duration: 0.30, ease: "easeOut" },
        }}
      />

      {items.map((item, idx) => (
        <Link
          href={`/webinars/${item?.link}`}
          key={item?.link}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => moveToIndex(idx)}
        >
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
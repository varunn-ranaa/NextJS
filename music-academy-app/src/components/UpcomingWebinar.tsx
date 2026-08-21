"use client"
import { HoverEffect } from "./ui/card-hover-effect";
import Link from "next/link";
import { Button } from "./ui/moving-border";


export function Webinars() {
  return (
    <div className="w-full mx-auto my-4 px-8 relative overflow-hidden bg-white dark:bg-gray-900 bg-grid-pattern">

    <div className="text-center mt-10 relative z-5">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED WEBINARS</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Enhance Your Musical Journey</p>
    </div>

    <div className="absolute inset-0 pointer-events-none bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      <div className="relative z-10 my-10">
        <HoverEffect items={featuredWebinars.map(webinar =>({
        title : webinar.title,
        description : webinar.description,
        link : webinar.slug
      }))} />
      </div>

      <div className="mt-6 text-center relative z-10 mb-10">
          <Link href={"/courses"}>
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-black-800"
            >
              View All Webinars
            </Button>
          </Link>
        </div>
    </div>
  );
}
const featuredWebinars = [
    {
      title: 'Understanding Music Theory',
      description:
        'Dive deep into the fundamentals of music theory and enhance your musical skills.',
      slug: 'understanding-music-theory',
      isFeatured: true,
    },
    {
      title: 'The Art of Songwriting',
      description:
        'Learn the craft of songwriting from experienced musicians and songwriters.',
      slug: 'the-art-of-songwriting',
      isFeatured: true,
    },
    {
      title: 'Mastering Your Instrument',
      description:
        'Advanced techniques to master your musical instrument of choice.',
      slug: 'mastering-your-instrument',
      isFeatured: true,
    },
    {
      title: 'Music Production Essentials',
      description:
        'Get started with music production with this comprehensive overview.',
      slug: 'music-production-essentials',
      isFeatured: true,
    },
    // Added two more webinars
    {
      title: 'Live Performance Techniques',
      description:
        'Enhance your live performance skills with expert tips and strategies.',
      slug: 'live-performance-techniques',
      isFeatured: true,
    },
    {
      title: 'Digital Music Marketing',
      description:
        'Learn how to promote your music effectively in the digital age.',
      slug: 'digital-music-marketing',
      isFeatured: true,
    },
  ];

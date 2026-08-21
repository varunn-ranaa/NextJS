"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import courseData from "../data/music_courses.json";
import { Button } from "./ui/moving-border";
import Link from "next/link";
import { BackgroundBeams } from "./ui/background-beams";

interface Course {
    id: number,
    title: string,
    slug: string,
    description: string,
    price: number,
    instructor: string,
    isFeatured: boolean,
    image: string
}

function FeatureCourses() {
    const featuredCourses = courseData.courses.filter((course: Course) => course.isFeatured)
    return (
        /* Added 'relative' and 'overflow-hidden' so beams stay bounded inside this section */
        <div className="py-12 black relative overflow-hidden">
            
            {/* Wrapped all text content in a relative container with z-10 so it stays clickable above the beams */}
            <div className="relative z-10">
                <div className="text-center">
                    <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED COURSES</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best</p>
                </div>
            </div>
            
            {/* Added relative z-10 here as well to protect the card interactivity */}
            <div className="mt-8 px-4 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 justify-items-center">
                    {featuredCourses.map((course: Course) => (
                        <div key={course.id} className="w-full flex justify-center">
                            <CardContainer className="inter-var w-full">
                                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[22rem] lg:w-[24rem] h-auto rounded-xl p-6 border">
                                    <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                                        {course.title}
                                    </CardItem>
                                    <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                                        {course.description}
                                    </CardItem>
                                    <CardItem translateZ="100" className="w-full mt-4">
                                        <img src={course.image} height="1000" width="1000" className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl" alt={course.title} />
                                    </CardItem>
                                    
                                    <div className="flex justify-center items-center mt-10">
                                        <CardItem 
                                            translateZ={20} 
                                            as={Link} 
                                            href={`/courses/${course.slug}`} 
                                            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-black text-white dark:bg-white dark:text-black transition-colors duration-200"
                                        >
                                            Learn More
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </div>
                    ))}
                </div>
            </div>

            {/* Added relative z-10 and mt-12 margin to separate the bottom button container cleanly */}
            <div className="text-center mt-12 relative z-10">
                <Link href={"/courses"}>
                    <Button
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-black-800"
                    >
                        View All Courses
                    </Button>
                </Link>
            </div>
            
            <BackgroundBeams />
        </div>
    )
}

export default FeatureCourses;

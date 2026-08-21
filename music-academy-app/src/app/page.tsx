import FeatureCourses from "@/components/FeatureCourses";
import HeroSection from "@/components/HeroSection";
import { Instructor } from "@/components/Instructor";
import MusicSchoolTestimonialCards from "@/components/TestimonialCards";
import { Webinars } from "@/components/UpcomingWebinar";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black/[0.96] antialiased ">
      <HeroSection/>
      <FeatureCourses />
      <MusicSchoolTestimonialCards />
      <Webinars />
      <Instructor/>
  
    </main>
  );
}

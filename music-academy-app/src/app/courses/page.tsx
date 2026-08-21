import { ExpandableCard } from "@/components/AllCoursesCard"
// import { BackgroundBeams } from '@/components/ui/background-beams';

function Course() {
  return (
  
      <div className="min-h-screen bg-black py-12 pt-36 relative overflow-hidden">
         <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">All courses </h1>   
         <div className="flex flex-wrap justify-center relative z-10"><ExpandableCard/></div>
      {/* <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" /> */}
      </div>
    
  )
}

export default Course
import { PopcornIcon } from "lucide-react";
import PinterestGrid from "@/components/PinterestGrid";
import HeadSearch from "@/components/HeadSearch";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Let Your Imagination Fly',
  description: 'Create stunning images with Imagen Fly, the fastest AI image generator tool.',
}


export default function HomeScreen() {
  return (
    <div className="w-full flex flex-col gap-5 justify-around items-center min-h-screen">
      <section className="flex flex-col justify-center items-center w-full min-h-[70vh] max-md:min-h-80 gap-10">
        <h1 className="leading-loose tracking-wider text-6xl max-md:text-3xl text-center font-black bg-gradient-to-r from-clr-1 via-clr-2 to-clr-3 bg-clip-text text-transparent animate-gradient">
          Let Your Imagination Fly!
        </h1>
        <HeadSearch />
      </section>

      <h1 className="flex justify-start items-center w-full text-3xl space-x-3"><PopcornIcon absoluteStrokeWidth /><span>Style</span></h1>

      <PinterestGrid imageUrls={[]} />

      {/* <Footer /> */}
    </div>
  );
}

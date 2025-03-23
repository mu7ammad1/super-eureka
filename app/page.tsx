import { PopcornIcon } from "lucide-react";
import PinterestGrid from "@/components/PinterestGrid";
import HeadSearch from "@/components/HeadSearch";
import type { Metadata } from 'next'
import { Screens_1, Screens_2 } from "@/components/Screens";
 
export const metadata: Metadata = {
  title: 'Let Your Imagination Fly',
  description: 'Create stunning images with Imagen Fly, the fastest AI image generator tool.',
}


export default function HomeScreen() {
  return (
    <>
      <Screens_2 />
    </>
  );
}

import type { Metadata } from 'next'
import { Screens_1, Screens_2 } from "@/components/Screens";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BadgeAlertIcon, Terminal } from "lucide-react"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Let Your Imagination Fly',
  description: 'Create stunning images with Imagen Fly, the fastest AI image generator tool.',
}


export default function HomeScreen() {
  return (
    <>
      <Alert variant="default" className='max-w-sm flex items-center justify-between rounded-full'>
        <AlertTitle className='flex items-center rounded-full gap-3'> <BadgeAlertIcon className="h-4 w-4" /> Experience our flow!</AlertTitle>
        <Link href={"/projects"} className='text-blue-500'>Try it now</Link>
      </Alert>

      <Screens_1 />
    </>
  );
}

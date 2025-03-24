import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Projects',
  description: 'Create stunning images with Imagen Fly, the fastest AI image generator tool.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <main className="w-full h-full bg-violet-500 p-0 m-0 fixed top-0 left-0 right-0 bottom-0 z-50 overscroll-none overflow-hidden">{children}</main>
}

































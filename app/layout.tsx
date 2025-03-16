import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Nav from "@/components/nav";
import { Analytics } from "@vercel/analytics/react"
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title:{
    template: '%s | Imagen Fly',
    default: 'Imagen Fly: Let Your Imagination Fly', // a default is required when creating a template
  },
  referrer: 'origin-when-cross-origin',
  description: "Create stunning images with Imagen Fly, the fastest AI image generator tool.",
  keywords: ['AI image generator', 'creative AI', 'image creation tool'],
  openGraph: {
    title: "Imagen Fly: Let Your Imagination Fly",
    description: "Unleash your creativity with AI-powered image generation.",
    images: ["/thumbnail.jpg"]
  },
};

const geistSans = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-primary-foreground text-foreground ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col justify-center items-center w-full">
            <Nav />
            <div className="w-full flex flex-col justify-normal items-center max-w-screen-xl min-h-screen p-3 ">
              {children}
            </div>

            <div className="fixed -top-20 -left-20 -z-10 size-full rounded-full blur-3xl bg-gradient-to-r from-clr-1/80 to-clr-4/80" />
            <div className="fixed -top-32 right-52 max-sm:right-0 -z-10 size-96 rounded-full blur-3xl bg-gradient-to-r from-clr-2/80 to-clr-3/80" />
            <div className="fixed -bottom-20 -right-20 -z-10 size-full rounded-full blur-3xl bg-gradient-to-r from-clr-3/80 to-clr-4/80" />

          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

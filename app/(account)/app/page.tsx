import GooglePlay from '@/assets/images/google-play-badge-logo-svgrepo-com.svg'
import AppleStore from '@/assets/images/download-on-the-app-store-apple-logo-svgrepo-com.svg'
import Image from 'next/image'
import Link from 'next/link'


export default function AppScreen() {
  return (
    <main className="flex justify-center items-center w-full">
      <section className="w-full flex flex-col items-center justify-center gap-10 rounded-xl">
        <h1 className="text-4xl text-center my-5">Invite {" "}
          <span className=" bg-gradient-to-r from-clr-1 via-clr-2 to-clr-3 bg-clip-text text-4xl font-extrabold text-transparent animate-gradient">
            Imagen fly
          </span>
        </h1>
        <h1 className="text-2xl text-center">Try Imgen Fly today and enjoy 50 free images every single day—download now!"</h1>
        <div className="flex items-center w-auto h-auto max-sm:flex-col justify-center gap-4">
          <Link
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Imagen Fly on Google Play"
          >
            <Image src={AppleStore} alt="Apple Store" className={`h-[58px] w-52 object-cover`} />
          </Link>
          <Link
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Imagen Fly on Google Play"
          >
            <Image src={GooglePlay} alt="Google Play" className={`h-[58px] w-52 object-cover`} />
          </Link>
        </div>
      </section>
    </main>
  )
}

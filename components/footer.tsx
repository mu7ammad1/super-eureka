import Image from 'next/image'
import React from 'react'
import visa from '@/assets/images/visa.png'
import mastercard from '@/assets/images/mastercard.png'

export default function Footer() {
    return (
        <footer className='p-5 w-full h-auto rounded-xl text-primary'>
            <main className='flex justify-between w-full bg-primary-foreground rounded-full backdrop-blur-md p-2 px-5'>
                <section>
                    <h3 className='font-semibold tracking-widest'>Lexnes ai</h3>
                </section>
                <section>center</section>
                <section className='flex justify-end items-center gap-2'>
                    <Image src={visa} alt='visa' className='w-7 h-7' />
                    <Image src={mastercard} alt='mastercard' className='w-7 h-7' />
                </section>
            </main>
        </footer>
    )
}

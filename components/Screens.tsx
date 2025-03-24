import React from 'react'
import HeadSearch from './HeadSearch'
import { CirclePlusIcon, EyeIcon, PopcornIcon } from 'lucide-react'
import PinterestGrid from './PinterestGrid'
import { Button } from './ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import ima from '@/assets/images/Hm460qWplZyLwc8z-generated_image.jpg'
import ima2 from '@/assets/images/gefKek3q7ZaePAMM-generated_image.jpg'
import Link from 'next/link'


function Screens_1() {
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

    )
}
function Screens_2() {
    return (
        <div className="w-full flex flex-col gap-5 justify-around items-center min-h-screen">
            <section className="flex flex-col justify-center items-center w-full min-h-96 gap-5">
                <div className='flex flex-col w-full gap-3 my-5'>
                    <h1 className="leading-loose tracking-wider text-6xl max-md:text-3xl text-center font-black bg-gradient-to-r from-clr-1 via-clr-2 to-clr-3 bg-clip-text text-transparent animate-gradient">
                        Let Your Imagination Fly!
                    </h1>
                    <p className="tracking-wider text-xl text-center font-normal ">
                        Create stunning images with Imagen Fly, the fastest AI image generator tool.
                    </p>
                </div>
                <div className='flex justify-center items-center gap-5 max-sm:flex-col'>
                    <Link href={'/projects'}>
                        <Button variant={'default'} size={'lg'} className='rounded-full uppercase'>Go New project</Button>
                    </Link>
                    <Link href={'/pricing'}>
                        <Button variant={'outline'} size={'lg'} className='rounded-full uppercase'>Price book</Button>
                    </Link>

                </div>

            </section>
            <div className='w-full h-[90vh] bg-stone-500 rounded-xl'>
            </div>
            <section className="flex flex-col justify-center items-center w-full min-h-96 gap-5">
                <div className='flex flex-col w-full gap-3 my-5'>
                    <h1 className="leading-loose tracking-wider text-6xl max-md:text-3xl text-center font-medium">
                        Find your Fly.
                    </h1>
                    <p className="tracking-wider text-xl text-center font-normal ">
                        Explore the Community to find a workflow that fits your needs.
                    </p>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <Button variant={'default'} size={'lg'} className='rounded-full uppercase'>Inspiration</Button>
                </div>

            </section>

            <section className="flex flex-col justify-center items-center w-full">

                <Carousel className='w-full max-w-screen-xl'>
                    <CarouselContent className="*:basis-full *:max-sm:basis-[90%] *:md:basis-1/3 *:lg:basis-1/4 w-full">
                        <CarouselItem>
                            <Card className='h-[360px]'>
                                <CardContent className="flex items-center justify-center h-full p-1">
                                    <Image src={ima} alt='id image' className='h-full w-full object-cover rounded-lg' />
                                </CardContent>
                            </Card>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Visit <EyeIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Clone <CirclePlusIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className='h-[360px]'>
                                <CardContent className="flex items-center justify-center h-full p-1">
                                    <Image src={ima2} alt='id image' className='h-full w-full object-cover rounded-lg' />
                                </CardContent>
                            </Card>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Visit <EyeIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Clone <CirclePlusIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className='h-[360px]'>
                                <CardContent className="flex items-center justify-center h-full p-1">
                                    <Image src={ima} alt='id image' className='h-full w-full object-cover rounded-lg' />
                                </CardContent>
                            </Card>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Visit <EyeIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Clone <CirclePlusIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className='h-[360px]'>
                                <CardContent className="flex items-center justify-center h-full p-1">
                                    <Image src={ima} alt='id image' className='h-full w-full object-cover rounded-lg' />
                                </CardContent>
                            </Card>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Visit <EyeIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Clone <CirclePlusIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className='h-[360px]'>
                                <CardContent className="flex items-center justify-center h-full p-1">
                                    <Image src={ima} alt='id image' className='h-full w-full object-cover rounded-lg' />
                                </CardContent>
                            </Card>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Visit <EyeIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Clone <CirclePlusIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className='h-[360px]'>
                                <CardContent className="flex items-center justify-center h-full p-1">
                                    <Image src={ima} alt='id image' className='h-full w-full object-cover rounded-lg' />
                                </CardContent>
                            </Card>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Visit <EyeIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                                <Button variant={'secondary'} size={'lg'} className='rounded-full uppercase'>Clone <CirclePlusIcon absoluteStrokeWidth className='w-5 h-5' /></Button>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>



            </section>
            <section className="flex flex-col justify-center items-center w-full min-h-80 pt-16 gap-5">
                <div className='flex flex-col w-full gap-3 my-5'>
                    <h1 className="leading-loose tracking-wider text-6xl max-md:text-3xl text-center font-medium">
                        FAQ Fly.
                    </h1>
                    <p className="tracking-wider text-xl text-center font-normal ">
                        Browse the FAQ to find answers that suit your needs.
                    </p>
                </div>
            </section>

            <section className="flex flex-col justify-center items-center w-full pb-16 pt-0">

                <Accordion type="single" className='w-full h-full max-w-4xl px-3' collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-3xl'>How can I use this platform to create images?</AccordionTrigger>
                        <AccordionContent className='text-base'>
                            Simply type a detailed description of the image you want to generate (e.g., "a futuristic city at sunset with flying cars") into the input field. Adjust any available settings, such as style or resolution, and click "Generate" to create your image. The AI will process your request and produce a visual based on your input.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='text-3xl'>What kind of images can this platform generate?</AccordionTrigger>
                        <AccordionContent className='text-base'>
                            The platform can generate a wide variety of images, including realistic scenes, abstract art, fantasy landscapes, portraits, product designs, and more. The possibilities depend on the AI model and the details you provide in your prompt.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className='text-3xl'>Do I need artistic skills to use this platform?</AccordionTrigger>
                        <AccordionContent className='text-base'>
                            No, you don’t need any artistic skills! The AI does the creative work for you. All you need is an idea or a description, and the platform will turn it into an image.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className='text-3xl'>How long does it take to generate an image?</AccordionTrigger>
                        <AccordionContent className='text-base'>
                            It typically takes a few seconds to a minute, depending on the complexity of your request and the platform’s processing power. High-resolution or detailed images might take slightly longer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className='text-3xl'>Are the images created unique?</AccordionTrigger>
                        <AccordionContent className='text-base'>
                            Yes, the images are generally unique because they are generated based on your specific input and the AI’s creative process. However, similar prompts might produce similar results, depending on the training data and model.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className='text-3xl'>Can I use the generated images for commercial purposes?</AccordionTrigger>
                        <AccordionContent className='text-base'>
                            Yes, you can use the generated images for commercial purposes. However, we recommend reviewing the platform’s terms of use to ensure compliance with any specific guidelines or requirements.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>




            </section>



        </div>

    )
}


export { Screens_1, Screens_2 }
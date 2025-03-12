import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CircleDashedIcon } from "lucide-react";

import Img from '@/assets/images/image.jpg'
import Img1 from '@/assets/images/0IOrVXfffIw7k85h-generated_image.jpg'
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export default function NewScreen() {
  return (
    <main className="w-full flex justify-center relative">
      <main className="flex flex-col justify-between items-center max-w-2xl">
        <section className="h-full w-full">
          <main className="grid grid-cols-2 max-md:grid-cols-1 gap-2 *:h-52 *:object-cover *:rounded-xl items-center justify-between mb-32">
            <Image
              alt='name'
              src={Img}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img1}
            />
            <Image
              alt='name'
              src={Img}
            />
            <Image
              alt='name'
              src={Img}
            />
          </main>
        </section>

        <div className="flex w-full max-w-2xl items-center border py-1.5 px-1.5 rounded-t-2xl bg-neutral-100 placeholder:text-black dark:bg-secondary border-none fixed bottom-0">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-full max-w-2xl items-center border rounded-3xl bg-neutral-100 placeholder:text-black dark:bg-secondary border-none">
              <Textarea
                placeholder="Tell us a little bit about Imegin"
                className="border-0 min-h-10 block w-full resize-none shadow-none focus-visible:ring-offset-0 focus-visible:ring-0 text-xl tracking-normal bg-transparent placeholder:text-primary/40"
              />
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2 justify-between">
                  <Button type="submit" variant={"outline"} size={"icon"} className="rounded-full">
                    <CircleDashedIcon className="h-5 w-5" />
                  </Button>
                  <Button type="submit" variant={"outline"} size={"sm"} className="rounded-full">
                    add style
                  </Button>
                </div>
                <Button type="submit" variant={"default"} size={"icon"} className="rounded-full w-auto h-auto p-2">
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </main>
  );
}

import { Button } from "@/components/ui/button"
import { Check, CoinsIcon, Image, LucideImage, VideoIcon } from "lucide-react"

export default function PricingComparison() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4">
      <div className="bg-secondary text-primary rounded-3xl p-12 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 gradient box">

        {/* Basic Plan */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold border-b border-primary/40 border-dashed border-spacing-10 pb-3">
              $2.99 <span className="text-lg font-normal text-primary/70">/week</span>
            </h2>
            <h3 className="text-2xl font-semibold mt-4">Basic Plan</h3>
            <p className="text-primary/70 mt-2">Unleash the Power of Imagination!</p>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-start gap-3 items-center">
              <CoinsIcon className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">1,300 daily Coin Generation</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <LucideImage className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Generation Images </span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <VideoIcon className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Generation Videos (video 5s)</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Real-Time Photos</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Enhancer Upscales</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Hour Video Animation</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Support +1500 Design</span>
            </div>
          </div>

          <Button variant={"default"} size={"lg"} className="rounded-full mt-auto py-6">
            Choose plan
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold border-b border-primary/40 border-dashed border-spacing-10 pb-3 grid grid-cols-3 items-center justify-between">
              $9.99 <span className="text-lg font-normal text-primary/70 max-sm:ml-1"> /month</span> <span className="text-lg font-extrabold text-stone-900 bg-white text-center rounded-full">Popular</span>
              
            </h2>
            <h3 className="text-2xl font-semibold mt-4">Pro Plan</h3>
            <p className="text-primary/70 mt-2">Elevate Your Creative Vision!</p>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-start gap-3 items-center">
              <CoinsIcon className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">4,500 daily Coin Generation</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited styles Images & Videos</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Videos</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Real-Time Photos</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Enhancer Upscales</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited Hour Video Animation</span>
            </div>
          </div>

          <Button variant={"default"} size={"lg"} className="rounded-full mt-auto py-6">
            Choose plan
          </Button>
        </div>

        {/* Enterprise Plan */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold border-b border-primary/40 border-dashed border-spacing-10 pb-3">
              $49 <span className="text-lg font-normal text-primary/70">/month</span>
            </h2>
            <h3 className="text-2xl font-semibold mt-4">Enterprise Plan</h3>
            <p className="text-primary/70 mt-2">Master the Art of Limitless Creation!</p>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">22,300 daily Coin Generation</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Unlimited styles Images & Videos</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Priority Support</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Custom Integrations</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Team Collaboration Tools</span>
            </div>
          </div>

          <Button variant={"default"} size={"lg"} className="rounded-full mt-auto py-6">
            Choose plan
          </Button>
        </div>
      </div>
    </div>
  )
}
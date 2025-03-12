import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingComparison() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-secondary backdrop-blur-md rounded-3xl p-12 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">

          <div className="mb-6">
            <h2 className="text-4xl font-bold border-b border-primary/40 border-dashed border-spacing-10 pb-3">
              Free <span className="text-lg font-normal text-primary/70">/month</span>
            </h2>
            <h3 className="text-2xl font-semibold mt-4">Starter</h3>
            <p className="text-primary/70 mt-2">Unleash the power of automation.</p>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2,700 images (2 point per image).</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">26 4K videos (50 points per video, totaling 1,300 points).</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">Basic email support.</span>
            </div>
          </div>

          <Button variant={"secondary"} size={"lg"} className="rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/10 shadow-none mt-auto py-6">
            current plan
          </Button>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold border-b border-primary/40 border-dashed border-spacing-10 pb-3">
              $19 <span className="text-lg font-normal text-primary/70">/month</span>
            </h2>
            <h3 className="text-2xl font-semibold mt-4">Professional</h3>
            <p className="text-primary/70 mt-2">Advanced tools to take your work to the next level.</p>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
          </div>

          <Button variant={"default"} size={"lg"} className="rounded-full mt-auto py-6">
            Choose plan
          </Button>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-bold border-b border-primary/40 border-dashed border-spacing-10 pb-3">
              $19 <span className="text-lg font-normal text-primary/70">/month</span>
            </h2>
            <h3 className="text-2xl font-semibold mt-4">Professional</h3>
            <p className="text-primary/70 mt-2">Advanced tools to take your work to the next level.</p>
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span>2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span>2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
            </div>
            <div className="flex justify-start gap-3 items-center">
              <Check className="w-4 h-4" />
              <span className="dark:text-[#e2e2e2]">2 Users team</span>
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


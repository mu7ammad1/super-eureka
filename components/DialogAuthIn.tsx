import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SubmitButton } from "./submit-button"
import { signInAction } from "@/app/actions/actions"
import { X } from "lucide-react"
import SignInWithGoogleButton from "./SignInWith0AuthButton"



export function DialogAuthIn() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="default" variant={"outline"} className="rounded-full">Make Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-sm:min-h-full border bg-gradient-to-b from-indigo-500 to-white/0 backdrop-blur-3xl rounded-2xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-medium">Make Account for Free</DialogTitle>
                </DialogHeader>
                <SignInWithGoogleButton />
                <hr className="mt-4 border-foreground h-0.5 border-dotted dotted" />
                <ElementSignIn />
                <DialogFooter className="sm:justify-start absolute top-5 right-5">
                    <DialogClose asChild>
                        <Button type="button" size={"icon"} variant="default" className="rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



const ElementSignIn = (props: any) => {
    return (
        <form className="flex-1 flex flex-col w-full min-w-64 mx-auto">
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        className="text-xs text-foreground underline"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                />
                <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                    Sign in
                </SubmitButton>
                {/* <FormMessage message={searchParams} /> */}
            </div>
        </form>
    )
}


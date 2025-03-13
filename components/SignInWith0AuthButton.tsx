"use client";

import { signInWithFacebookAction, signInWithGoogleAction } from "@/app/actions/actions";
import { Button } from "./ui/button";
import { FacebookIcon } from "lucide-react";

export default function SignInPage() {

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogleAction();

    // If the response is successful, manually redirect to the URL
    if (result?.success && result?.redirectUrl) {
      window.location.href = result.redirectUrl; // Redirect the browser to Google
    }
  };


  const handleFacebookAction = async () => {
    const result = await signInWithFacebookAction();

    // If the response is successful, manually redirect to the URL
    if (result?.success && result?.redirectUrl) {
      window.location.href = result.redirectUrl; // Redirect the browser to Google
    }
  };

  return (
    <div className="flex gap-4 *:uppercase">
      <Button size={"default"} variant={"default"} className="w-full space-x-3 *:fill-blue-500" onClick={handleGoogleSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="google">
          <path fillRule="evenodd" d="M19.822 8.004h-9.61c0 1 0 2.998-.007 3.998h5.569c-.213.999-.97 2.398-2.039 3.103-.001-.001-.002.006-.004.005-1.421.938-3.297 1.151-4.69.871-2.183-.433-3.91-2.016-4.612-4.027.004-.003.007-.031.01-.033C4 10.673 4 9.003 4.439 8.004c.565-1.837 2.345-3.513 4.53-3.972 1.759-.373 3.743.031 5.202 1.396.194-.19 2.685-2.622 2.872-2.82C12.058-1.907 4.077-.318 1.09 5.511l-.006.011a9.767 9.767 0 0 0 .01 8.964l-.01.008a10.18 10.18 0 0 0 6.48 5.165c3.01.79 6.843.25 9.41-2.072l.003.003c2.175-1.958 3.529-5.296 2.845-9.586"></path>
        </svg>
        <span>Google</span>
      </Button>
      <Button size={"default"} variant={"default"} className="w-full space-x-3 *:fill-blue-500" onClick={handleFacebookAction}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" id="facebook">
          <path fillRule="evenodd" d="M6.821 20v-9h2.733L10 7H6.821V5.052C6.821 4.022 6.848 3 8.287 3h1.458V.14c0-.043-1.253-.14-2.52-.14C4.58 0 2.923 1.657 2.923 4.7V7H0v4h2.923v9h3.898z"></path>
        </svg>
        <span>Facebook</span>
      </Button>
    </div>
  );
}
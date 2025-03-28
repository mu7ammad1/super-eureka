"use client";

import { signInWithFacebookAction, signInWithGoogleAction } from "@/app/actions/actions";
import { Button } from "./ui/button";

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
      <Button size={"default"} variant={"default"} className="w-full space-x-3 *:fill-primary" onClick={handleGoogleSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>        <span>Google</span>
      </Button>
      <Button size={"default"} variant={"default"} className="w-full space-x-3 *:fill-blue-500 hidden" onClick={handleFacebookAction}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
        <span>Facebook</span>
      </Button>
    </div>
  );
}
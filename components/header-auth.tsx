import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { SearchAndmenu } from "./SearchAndmenu";
import Drop from "./Drop";
import { DialogAuthIn } from "./DialogAuthIn";
import DialogAuthUp from "./DialogAuthUp";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: avatar_url, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user?.id)
    .single();
  let avatar = avatar_url?.avatar_url

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in 2</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up 2</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4 px-2">
      <SearchAndmenu />
      <Drop avatar={avatar} />
    </div>
  ) : (
    <div className="flex gap-2">
      <DialogAuthIn />
      <DialogAuthUp />
    </div>
  );
}

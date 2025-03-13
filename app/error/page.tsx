import { Button } from "@/components/ui/button";

export default function Error() {

  return (
    <div>
      <p>An error occurred, please try again later.</p>
      <Button variant={"secondary"} size={"default"}>
        Retry
      </Button>
    </div>
  );
}
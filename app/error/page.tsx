import { Button } from "@/components/ui/button";

export default function Error() {

  return (
    <div>
      <p> حدث خطأ، يرجى إعادة المحاولة لاحقًا.</p>
      <Button variant={"secondary"} size={"default"}>
        اعد المحاولة
      </Button>
    </div>
  );
}
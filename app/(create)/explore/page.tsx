import AIResizeComponent from "@/app/actions/AIResize";
import BackgroundRemoverComponent from "@/app/actions/BackgroundRemoverComponent";
import UploadImage from "@/app/actions/enhanceImage";
import TextToImageComponent from "@/app/actions/TextToImage";
import RemoveElementComponent from "@/app/actions/RetouchComponent"; 
import GenerativeFillComponent from "@/app/actions/GenerativeFill";

export default function ExpoloreScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 w-full">
      <UploadImage />
      <BackgroundRemoverComponent />
      <TextToImageComponent />
      <AIResizeComponent />
      <RemoveElementComponent />
      <GenerativeFillComponent />
    </div>
  )
}

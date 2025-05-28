import { Tables } from "@datatypes.types";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { Download, Trash } from "lucide-react";
import { Badge } from "../ui/badge";

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<"generated_images">;
  onclose: () => void;
}
const ImageDialog = ({ image, onclose }: ImageDialogProps) => {
  return (
    <Sheet open={true} onOpenChange={onclose}>
      <SheetContent className="max-w-full sm:max-w-xl w-full">
        <SheetHeader>
          <SheetTitle className="text-2xl w-full">Image Details</SheetTitle>
          <div className="relative w-fit h-fit">
            <Image
              src={image.url ?? ""}
              alt={image.prompt ?? "Generated image"}
              width={image.width ?? 1}
              height={image.height ?? 1}
              className="object-cover rounded"
            />{" "}
            <div className="flex absolute bottom-4 right-4 gap-4">
              <Button className="w-fit">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>{" "}
              <Button className="w-fit" variant={"destructive"}>
                <Trash className="w-4 h-4" /> Trash
              </Button>
            </div>
          </div>
          <hr className="inline-block w-full border-primary/30 mb-2" />
          <p className="flex flex-col text-primary/90">
            <span className="text-primary text-xl font-semibold">Prompt</span>
            {image.prompt}
          </p>
          <hr className="inline-block w-full border-primary/30 my-3" />
          <div>
            <Badge variant={"secondary"}>
              {" "}
              <span className="uppercase mr-2 text-primary font-semibold ">
                Model-Id:
                {image.model}
              </span>
            </Badge>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ImageDialog;

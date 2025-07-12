import { Tables } from "@datatypes.types";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { Download, Trash } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";
import DeleteImage from "./DeleteImage";

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<"generated_images">;
  onclose: () => void;
  className?: string;
}
const ImageDialog = ({ image, onclose }: ImageDialogProps) => {
  const handleDownload = () => {
    fetch(image.url || "")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `generated-images-${Date.now()}.${image?.output_format}`
        );

        document.body.appendChild(link);
        link.click();

        //clean up
        link.parentNode?.removeChild(link);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Sheet open={true} onOpenChange={onclose}>
      <SheetContent className="max-w-full sm:max-w-xl w-full">
        <SheetHeader>
          <SheetTitle className="text-2xl w-full">Image Details</SheetTitle>
          <ScrollArea className="overflow-y-auto flex flex-col pb-32 max-h-[100vh]">
            <div className="relative w-fit h-fit">
              <Image
                src={image.url ?? ""}
                alt={image.prompt ?? "Generated image"}
                width={image.width ?? 1}
                height={image.height ?? 1}
                className="object-cover rounded"
              />{" "}
              <div className="flex absolute bottom-4 right-4 gap-4">
                <Button className="w-fit" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>{" "}
                <DeleteImage
                  imageId={image.id.toString()}
                  onDelete={onclose}
                  imageName={image.image_name ?? ""}
                  className="w-fit"
                />
              </div>
            </div>
            <hr className="inline-block w-full border-primary/30 mb-2" />
            <p className="flex flex-col text-primary/90">
              <span className="text-primary text-xl font-semibold">Prompt</span>
              {image.prompt}
            </p>
            <hr className="inline-block w-full border-primary/30 my-3" />
            <div className="flex flex-wrap gap-3">
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  Model-Id:
                </span>{" "}
                {image.model}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  Aspect_ratio:
                </span>{" "}
                {image.aspect_ratio}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  Dimension
                </span>{" "}
                {image.width} X {image.height}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  guidance:
                </span>{" "}
                {image.guidance}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  inference_steps:
                </span>{" "}
                {image.num_inference_steps}
              </Badge>{" "}
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  output_format:
                </span>{" "}
                {image.output_format}
              </Badge>{" "}
              <Badge
                variant={"secondary"}
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-normal"
              >
                <span className="uppercase mr-2 text-primary font-semibold ">
                  Created At:
                </span>{" "}
                {new Date(image.created_at).toLocaleDateString()}
              </Badge>
            </div>{" "}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ImageDialog;

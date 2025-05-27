import { Tables } from "@datatypes.types";
import React from "react";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  console.log(images);

  if ((images.length = 0)) {
    return (
      <div className="flex justify-center h-[50vh] items-center text-muted-foreground">
        No images found
      </div>
    );
  }
  return (
    <section className="container mx-auto py-8">
      <div className="columns-4 "></div>
    </section>
  );
};

export default GalleryComponent;

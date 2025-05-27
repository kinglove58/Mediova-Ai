import { Tables } from "@datatypes.types";
import Image from "next/image";
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
      <div className="columns-4 gap-4 space-y-4">
        {images.map((image, index) => {
          return (
            <div key={index}>
              <div className="relative overflow-hidden cursor-pointer transition-transform">
                <Image
                  src={image.url ?? ""}
                  alt={image.prompt ?? "Generated image"}
                  width={image.width ?? 1}
                  height={image.height ?? 1}
                  className="object-cover rounded"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GalleryComponent;

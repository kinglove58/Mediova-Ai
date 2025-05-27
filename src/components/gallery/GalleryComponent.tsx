"use client"
import { Tables } from "@datatypes.types";
import Image from "next/image";
import React, { useState } from "react";
import ImageDialog from "./ImageDialog";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

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
              <div
                className="relative group overflow-hidden cursor-pointer transition-transform"
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 bg-black transition-opacity group-hover:opacity-70 opacity-0 duration-300 rounded">
                  <div className="flex items-center justify-center h-full">
                    <p className="font-semibold text-lg text-primary-foreground">
                      view details
                    </p>
                  </div>
                </div>
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

      {selectedImage && <ImageDialog image={selectedImage} />}
    </section>
  );
};

export default GalleryComponent;

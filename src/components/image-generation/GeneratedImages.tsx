import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import useGeneratedStore from "@/store/useGeneratedStore";

/* const images = [
  {
    src: "/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg ",
    alt: "some image",
  },
  {
    src: "/hero-images/Futuristic Helmet Portrait.jpeg",
    alt: "some image",
  },
  {
    src: "/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg",
    alt: "some image",
  },
  {
    src: "/hero-images/Confident Woman in Urban Setting.jpeg ",
    alt: "some image",
  },
]; */

const GeneratedImages = () => {
  const images = useGeneratedStore((state) => state.images);
  const loading = useGeneratedStore((state) => state.loading);
  
  if (images.length === 0) {
    return (
      <Card className="w-full max-w-2xl bg-muted">
        <CardContent className="flex items-center justify-center p-6 aspect-square">
          <span className="text-2xl">No Image generated</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex relative rounded-lg aspect-square items-center justify-center overflow-hidden">
              <Image
                src={image.src.trim()}
                alt={image.alt}
                width={512}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GeneratedImages;

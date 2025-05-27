import { Tables } from "@datatypes.types";
import React from "react";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryComponent = () => {
  return <div>GalleryComponent</div>;
};

export default GalleryComponent;

import { getImages } from "@/app/actions/image-actions";
import GalleryComponent from "@/components/gallery/GalleryComponent";
import React from "react";

const GalleryPage = async () => {
  const { data: images } = await getImages();
  return (
    <section className="container mx-auto">
      <h1 className="text-3xl mb-2 font-semibold">Gallery</h1>
      <p className="text-muted-foreground mb-6">
        Here you can see all the images you have generated. Click on an image to
        view detail
      </p>
      <GalleryComponent images={images || []} />
    </section>
  );
};

export default GalleryPage;

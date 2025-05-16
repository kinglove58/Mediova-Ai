import Configuration from "@/components/image-generation/Configuration";
import React from "react";

const ImageGenerationPage = () => {
  return (
    <section className="grid grid-cols-3 gap-4 container mx-auto overflow-hidden">
      <Configuration />
      <div className="col-span-2 p-4 flex justify-center rounded-xl items-center">
        output
      </div>
    </section>
  );
};

export default ImageGenerationPage;

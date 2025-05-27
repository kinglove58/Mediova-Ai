import { Tables } from "@datatypes.types";
import React from "react";
interface ImageDialogProps {
 image: { url: string | undefined } & Tables<"generated_images">;
}
const ImageDialog = ({ image }:ImageDialogProps) => {
  return <div>ImageDialog</div>;
};

export default ImageDialog;

import { ImageGenerationFormSchema } from "@/components/image-generation/Configuration";
import { create } from "zustand";
import { z } from "zod";
import {
  generationImageAction,
  storeImages,
} from "@/app/actions/image-actions";
import { toast } from "sonner";

type ImageGenerationInput = z.infer<typeof ImageGenerationFormSchema>;

type GeneratedImage = {
  url: string;
} & ImageGenerationInput;
interface GenerateState {
  loading: boolean;
  // images: Array<{ url: string }>;
  images: GeneratedImage[],
  error: string | null;
  generateImage: (values: ImageGenerationInput) => Promise<void>;
}



const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values) => {
    set({ loading: true, error: null });
    const toastid = toast.loading("Generating image...");
    try {
      const { success, error, data } = await generationImageAction(values);
      console.log("generationImageAction data:", data);
      console.log("generationImageAction error:", error);

      if (!success || !data || !Array.isArray(data)) {
        set({
          loading: false,
          error: error || "No data returned from image generation.",
        });
        toast.error(error || "No data returned from image generation.");
        return;
      }

      const dataWithUrl: GeneratedImage[] = data.map((url) => {
        console.log("url in data.map:", url);
        return {
          url,
          ...values,
        };
      });
      console.log("dataWithUrl:", dataWithUrl);

      set((state) => ({
        images: [...state.images, ...dataWithUrl],
        loading: false,
      }));
      toast.success("Image Generated successfully!");
      await storeImages(dataWithUrl);
      toast.success("Image stored succefully!");
    } catch (error) {
      console.log(error);
      set({
        error: "failed to generate image please try again later",
        loading: false,
      });
      toast.error("Failed to generate image.");
    }
  },
}));

export default useGeneratedStore;

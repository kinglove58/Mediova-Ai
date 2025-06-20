import { ImageGenerationFormSchema } from "@/components/image-generation/Configuration";
import { create } from "zustand";
import { z } from "zod";
import {
  generationImageAction,
  storeImages,
} from "@/app/actions/image-actions";
import { toast } from "sonner";

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (
    values: z.infer<typeof ImageGenerationFormSchema>
  ) => Promise<void>;
}

const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: z.infer<typeof ImageGenerationFormSchema>) => {
    set({ loading: true, error: null });
    const toastid = toast.loading("Generating image...");
    try {
      const { success, error, data } = await generationImageAction(values);

      if (!success) {
        set({ loading: false, error: error });
        return;
      }

      const dataWithUrl = data.map((url: string) => {
        return {
          url,
          ...values,
        };
      });
      set({ images: dataWithUrl, loading: false });
      toast.success("Image Generated successfully!");
      await storeImages(dataWithUrl);
      toast.success("Image stored succefully!");
    } catch (error) {
      console.log(error);
      set({
        error: "failed to generate image please try again later",
        loading: false,
      });
    }
  },
}));

export default useGeneratedStore;

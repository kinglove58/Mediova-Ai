import { ImageGenerationFormSchema } from "@/components/image-generation/Configuration";
import { create } from "zustand";
import { z } from "zod";
import { generationImageAction } from "@/app/actions/image-actions";

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
}

const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async(values:z.infer<typeof ImageGenerationFormSchema>)=> {
    set({loading: true, error: false})
    try {
        const {success, error, data} = await generationImageAction(values)
    } catch () {
        
    }
  }
}));

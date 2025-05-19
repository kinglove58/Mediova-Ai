"use server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface ImageResponse {
  error: string | null;
  success: boolean;
  data: unknown | null;
}

export async function generationImage(input: z.infer<typeof ImageGenerationFormSchema>): Promise<ImageResponse> {
    const modelInput = {
        prompt: input.prompt,
        aspect_ratio: input.aspect_ratio,
        guidance: input.guidance,
        num_outputs: input.num_outputs,
        output_quality: input.output_quality,
        num_inference_steps: input.num_inference_steps,
        output_format: input.output_format,
    };

    const output = await replicate.run(input.model as `${string}/${string}`, { input: modelInput });
}
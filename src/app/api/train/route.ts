import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: NextRequest) {
  const WEBHOOK_URL =
    process.env.WEBHOOK_URL ?? "https://90af8d678b0a.ngrok-free.app";
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("the replicate api is not valid");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    // You can add your training logic here
    const input = {
      fileKey: formData.get("fileKey") as string,
      modelName: formData.get("modelName") as string,
      gender: formData.get("gender") as string,
    };

    if (!input.fileKey || !input.modelName) {
      return NextResponse.json(
        { error: "misssing required key" },
        { status: 400 }
      );
    }
    const fileName = input.fileKey.replace("training-data/", "");
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training-data")
      .createSignedUrl(fileName, 3600);
    if (!fileUrl?.signedUrl) {
      throw new Error(`Failed to generate signed URL for file: ${fileName}`);
    }

    /*   const hardware = await replicate.hardware.list(); */
    const modelId = `${user.id}_${Date.now}_${input.modelName
      .toLowerCase()
      .replaceAll(" ", "_")}`;

    await replicate.models.create("kinglove58", modelId, {
      visibility: "private",
      hardware: "gpu-a100-large",
    });

    //start training
    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "26dce37af90b9d997eeb970d92e47de3064d46c300504ae376c75bef6a9022d2",
      {
        // You need to create a model on Replicate that will be the destination for the trained version.
        destination: `kinglove58/${modelId}`,
        input: {
          steps: 1200,
          resolution: "1024",
          input_images: fileUrl.signedUrl,
          trigger_word: "ohxv",
        },
        webhook: `${WEBHOOK_URL}/api/webhooks/training`,
        webhook_events_filter: ["completed"], // optional
      }
    );

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );

    // Return a success response or whatever is appropriate
    return NextResponse.json(
      {
        message: "Training started successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("traning error", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "failed to start the model training";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

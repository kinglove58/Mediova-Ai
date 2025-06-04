import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: NextRequest) {
  const replicate = new Replicate({ auth: process.env.REPLICATE });
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
          error: "unauthorize",
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
    const fileName = input.fileKey.replace("training_data/", "");
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training_data")
      .createSignedUrl(fileName, 3600);
    if (!fileUrl?.signedUrl) {
      throw new Error("failed to get the url");
    }

    const hardware = await replicate.hardware.list()

    // await replicate.models.create("techking", modelId)

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

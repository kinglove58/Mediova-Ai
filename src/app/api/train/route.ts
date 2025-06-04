import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
const fileName = input.fileKey.replace("training_data/", "")
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

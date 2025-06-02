import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(rquest: NextRequest) {
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

    const formData = await rquest.formData()
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

import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required partner application fields
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.brandType ||
      !body.partnerType ||
      !body.message
    ) {
      return NextResponse.json(
        { message: "All partner application fields are required" },
        { status: 400 }
      );
    }

    // ✅ Partner application payload
    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      brandType: body.brandType,
      partnerType: body.partnerType,
      message: body.message,
    };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const response = await axios.post(
      `${base_url}/api/partners/apply`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return backend response directly
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(
          error.response.data,
          { status: error.response.status }
        );
      }

      return NextResponse.json(
        { message: "No response from server", error: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

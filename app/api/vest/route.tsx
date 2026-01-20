import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required vest fields only
    if (
      !body.type ||
      !body.color ||
      !body.colorName ||
      !body.price ||
      !body.size
    ) {
      return NextResponse.json(
        { message: "All vest fields are required" },
        { status: 400 }
      );
    }

    // ✅ ONLY vest payload
    const payload = {
      type: body.type,
      color: body.color,
      colorName: body.colorName,
      price: body.price,
      size: body.size,
    };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const response = await axios.post(
      `${base_url}/api/auth/vest`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Directly return backend response
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

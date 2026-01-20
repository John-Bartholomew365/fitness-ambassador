import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const userId = formData.get("userId");
    const paymentProof = formData.get("paymentProof");

    // Validate required fields
    if (!userId || !paymentProof) {
      return NextResponse.json(
        { message: "userId and paymentProof are required" },
        { status: 400 }
      );
    }

    // Ensure paymentProof is a file
    if (!(paymentProof instanceof File)) {
      return NextResponse.json(
        { message: "paymentProof must be a file" },
        { status: 400 }
      );
    }

    // ✅ Build FormData to send to backend
    const payload = new FormData();
    payload.append("userId", userId.toString());
    payload.append("paymentProof", paymentProof);

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const response = await axios.post(
      `${base_url}/api/auth/upload-proof`,
      payload,
      {
        headers: {
          // Let axios set correct boundary
          "Content-Type": "multipart/form-data",
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

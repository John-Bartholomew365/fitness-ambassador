import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required booking fields
    if (
      !body.fullName ||
      !body.email ||
      !body.phoneNumber ||
      !body.experienceLevel ||
      !body.plan ||
      !body.fitnessGoal
    ) {
      return NextResponse.json(
        { message: "All booking fields are required" },
        { status: 400 }
      );
    }

    // ✅ ONLY booking payload
    const payload = {
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      experienceLevel: body.experienceLevel,
      plan: body.plan,
      fitnessGoal: body.fitnessGoal,
    };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const response = await axios.post(
      `${base_url}/api/users/book-training`,
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

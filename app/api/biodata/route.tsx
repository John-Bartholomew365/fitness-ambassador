import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required registration fields
    if (
      !body.email ||
      !body.vestId ||
      !body.fullName ||
      !body.phoneNumber ||
      !body.gender ||
      body.dobDay === undefined ||
      !body.dobMonth ||
      body.medicalCondition === undefined ||
      !body.emergencyName ||
      !body.emergencyPhone
    ) {
      return NextResponse.json(
        { message: "All registration fields are required" },
        { status: 400 }
      );
    }

    // ✅ ONLY registration payload
    const payload = {
      email: body.email,
      vestId: body.vestId,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      gender: body.gender,
      dobDay: body.dobDay,
      dobMonth: body.dobMonth,
      medicalCondition: body.medicalCondition,
      medicalDetails: body.medicalDetails || null,
      emergencyName: body.emergencyName,
      emergencyPhone: body.emergencyPhone,
    };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const response = await axios.post(
      `${base_url}/api/auth/register`,
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

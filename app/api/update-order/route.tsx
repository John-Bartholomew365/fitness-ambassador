import axios from "axios";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, paymentStatus, adminMessage } = body;


    if (!id) {
      return NextResponse.json(
        { message: "Payment ID is required" },
        { status: 400 }
      );
    }

    if (!paymentStatus || !["confirmed", "failed"].includes(paymentStatus)) {
      return NextResponse.json(
        {
          message:
            "paymentStatus must be either 'confirmed' or 'failed'",
        },
        { status: 400 }
      );
    }

    if (paymentStatus === "failed" && !adminMessage) {
      return NextResponse.json(
        {
          message:
            "adminMessage is required when paymentStatus is 'failed'",
        },
        { status: 400 }
      );
    }

    const payload: Record<string, string> = {
      paymentStatus,
    };

    if (adminMessage) {
      payload.adminMessage = adminMessage;
    }

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const authHeader = req.headers.get("authorization");
    const token =
      authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7)
        : "";

    if (!token) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const backendUrl = `${base_url}/api/admin/${id}/confirm-payment`;

    const response = await axios.patch(
      backendUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

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
        { message: "No response from backend server", error: error.message },
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

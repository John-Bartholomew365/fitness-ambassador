import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, verificationNotes } = body;

    console.log("🚀 Update status request received:", { id, status, verificationNotes });

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { message: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Validate status
    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Status must be either 'approved' or 'rejected'" },
        { status: 400 }
      );
    }

    const payload = {
      status: status,
    };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      console.error("❌ BASE_URL environment variable is not set");
      throw new Error("BASE_URL environment variable is not set");
    }

    // Get authorization token from request headers
    const authHeader = req.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    if (!token) {
      console.error("❌ No authorization token found in headers");
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const backendUrl = `${base_url}/api/admin/update-payment-status/${id}`;
    console.log("📤 Making request to backend:", {
      url: backendUrl,
      payload,
      tokenPresent: !!token,
    });

    const response = await axios.put(
      backendUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    console.log("✅ Backend response:", {
      status: response.status,
      data: response.data
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error updating payment status:", error);
    
    if (axios.isAxiosError(error)) {
      console.error("📊 Axios error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });

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
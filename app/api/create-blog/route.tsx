import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Get all form data
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const publish = formData.get("publish");
    const featured = formData.get("featured");
    const coverImage = formData.get("coverImage");

    // Validate required fields
    if (!title || !content || !category || !coverImage) {
      return NextResponse.json(
        { message: "Title, content, category, and cover image are required" },
        { status: 400 }
      );
    }

    // Build payload for backend
    const payload = new FormData();
    payload.append("title", title.toString());
    payload.append("excerpt", excerpt?.toString() || "");
    payload.append("content", content.toString());
    payload.append("category", category.toString());
    
    // Handle tags - ensure it's a JSON string
    if (tags) {
      try {
        const tagsValue = tags.toString();
        payload.append("tags", tagsValue);
      } catch (error) {
        payload.append("tags", JSON.stringify([]));
      }
    } else {
      payload.append("tags", JSON.stringify([]));
    }
    
    payload.append("publish", publish?.toString() || "false");
    payload.append("featured", featured?.toString() || "false");
    
    // Handle image
    if (coverImage instanceof File) {
      payload.append("coverImage", coverImage);
    } else {
      return NextResponse.json(
        { message: "Cover image must be a file" },
        { status: 400 }
      );
    }

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    // Get authorization token from the request headers
    const authHeader = req.headers.get("authorization");
    let token = "";
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    const response = await axios.post(
      `${base_url}/api/blogs/create`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { "token": token }),
        },
      }
    );

    // Return backend response directly
    return NextResponse.json(response.data);
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      
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
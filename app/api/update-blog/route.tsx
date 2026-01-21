import axios from "axios";
import { NextResponse } from "next/server";

function getIdFromRequest(req: Request) {
  const { searchParams } = new URL(req.url);
  return searchParams.get("id");
}

/* =========================
   UPDATE BLOG (PUT)
========================= */
export async function PUT(req: Request) {
  try {
    const id = getIdFromRequest(req);

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const publish = formData.get("publish");
    const featured = formData.get("featured");
    const coverImage = formData.get("coverImage");

    console.log("📝 Update blog request:", {
      id,
      title,
      excerpt,
      category,
      hasImage: !!coverImage
    });

    if (!title || !content || !category) {
      return NextResponse.json(
        { message: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    const payload = new FormData();
    payload.append("title", title.toString());
    payload.append("excerpt", excerpt?.toString() || "");
    payload.append("content", content.toString());
    payload.append("category", category.toString());
    payload.append("tags", tags?.toString() || JSON.stringify([]));
    payload.append("publish", publish?.toString() || "false");
    payload.append("featured", featured?.toString() || "false");

    if (coverImage instanceof File) {
      payload.append("coverImage", coverImage);
    }

    const base_url = process.env.BASE_URL;
    if (!base_url) throw new Error("BASE_URL not set");

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : "";

    if (!token) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await axios.put(
      `${base_url}/api/blogs/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { token }),
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error updating blog:", error);
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: error.message },
        { status: error.response?.status || 503 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE BLOG (DELETE)
========================= */
export async function DELETE(req: Request) {
  try {
    const id = getIdFromRequest(req);

    console.log("Delete blog request for ID:", id);

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const base_url = process.env.BASE_URL;
    if (!base_url) throw new Error("BASE_URL not set");

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : "";

    if (!token) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await axios.delete(
      `${base_url}/api/blogs/${id}`,
      {
        headers: {
          ...(token && { token }),
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: error.message },
        { status: error.response?.status || 503 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
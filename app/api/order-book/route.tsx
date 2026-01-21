import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const fullName = formData.get("fullName");
        const phoneNumber = formData.get("phoneNumber");
        const email = formData.get("email");
        const deliveryAddress = formData.get("deliveryAddress");
        const additionalNotes = formData.get("additionalNotes");
        const paymentReceipt = formData.get("paymentReceipt");

        // Validate required fields
        if (
            !fullName ||
            !phoneNumber ||
            !email ||
            !deliveryAddress ||
            !paymentReceipt
        ) {
            return NextResponse.json(
                { message: "All required order fields must be provided" },
                { status: 400 }
            );
        }

        // Rebuild FormData to forward to backend
        const payload = new FormData();
        payload.append("fullName", fullName as string);
        payload.append("phoneNumber", phoneNumber as string);
        payload.append("email", email as string);
        payload.append("deliveryAddress", deliveryAddress as string);

        if (additionalNotes) {
            payload.append("additionalNotes", additionalNotes as string);
        }

        // paymentReceipt must be File
        if (paymentReceipt instanceof File) {
            payload.append("paymentReceipt", paymentReceipt);
        }

        const base_url = process.env.BASE_URL;
        if (!base_url) {
            throw new Error("BASE_URL environment variable is not set");
        }

        const response = await axios.post(
            `${base_url}/api/users/order-book`,
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
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

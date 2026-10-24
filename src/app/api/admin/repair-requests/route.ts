import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Please log in." }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required." },
        { status: 403 },
      );
    }

    const apiUrl = process.env.SERVER_BASE_URL;
    const secret = process.env.INTERNAL_API_SECRET;

    if (!apiUrl || !secret) {
      console.error("Missing server API configuration.");
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 },
      );
    }

    const response = await fetch(`${apiUrl}/admin/repair-requests`, {
      headers: {
        "x-internal-api-secret": secret,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Admin repair requests error:", error);

    return NextResponse.json(
      { message: "Failed to load repair requests." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.API_URL!;
  const auth_token = process.env.AUTH_TOKEN!;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

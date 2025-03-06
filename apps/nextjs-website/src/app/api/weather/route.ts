import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat: string | null = searchParams.get("lat");
  const long: string | null = searchParams.get("long");

  if (!lat || !long) {
    return NextResponse.json(
      {
        error:
          "Missing required query parameters: 'lat' and 'long' are required.",
      },
      { status: 400 }
    );
  }

  try {
    const queryParams = new URLSearchParams({
      lat,
      lon: long,
      appid: process.env.OPEN_WEATHER_KEY!,
      units: "metric",
    });

    const response = await fetch(OPEN_WEATHER_URL + queryParams, {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weather", info: error },
      { status: 500 }
    );
  }
}

const OPEN_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`;

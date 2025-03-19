import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: ALLOW_CORS,
  });
}

export async function GET(request: NextRequest) {
  const { city = "Aracaju", country = "BR" } = geolocation(request);

  try {
    const queryParams = new URLSearchParams({
      q: `${city},${country}`,
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      appid: process.env.OPEN_WEATHER_KEY!,
      units: "metric",
    });

    const response = await fetch(OPEN_WEATHER_URL + queryParams, {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();

    return NextResponse.json(data, { status: 200, headers: ALLOW_CORS });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weather", info: error },
      { status: 500, headers: ALLOW_CORS },
    );
  }
}

const OPEN_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const ALLOW_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

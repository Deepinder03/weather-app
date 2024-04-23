import { NextRequest, NextResponse } from "next/server";

// API endpoint at localhost:3000/api/weather
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  let url;

  // Decide the API request format based on the provided parameters
  if (address) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=c02ceeecd4e685ea17f27d6e09d41e0f`;
  } else if (latitude && longitude) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c02ceeecd4e685ea17f27d6e09d41e0f`;
  } else {
    // Return error if neither an address nor coordinates are provided
    return new NextResponse(JSON.stringify({ error: "Address or latitude and longitude parameters are missing" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Custom-Header'
      }
    });
  }

  console.log("Fetching URL:", url);
  const res = await fetch(url);

  const data = await res.json();

  // Create a response object and modify its headers to include CORS headers
  const response = NextResponse.json({ data });
  response.headers.set('Content-Type', 'application/json');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allows all domains
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specific methods allowed
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header'); // Specifies allowed headers

  return response;
}

// Middleware for handling CORS preflight requests
export function middleware(request) {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 }); // No content for OPTIONS
    response.headers.set('Content-Type', 'application/json');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
    return response;
  }
  return NextResponse.next();
}

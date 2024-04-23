import { NextRequest, NextResponse } from "next/server";

// API endpoint
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  let baseURL = request.nextUrl.clone();
  baseURL.pathname = ''; // Clear the path to use the base URL of the host

  let apiURL;

  // Decide the API request format based on the provided parameters
  if (address) {
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=fa6171513136cc67b183a916fda542d8`;
  } else if (latitude && longitude) {
    apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fa6171513136cc67b183a916fda542d8`;
  } else {
    // Return error if neither an address nor coordinates are provided
    return new NextResponse(JSON.stringify({ error: "Address or latitude and longitude parameters are missing" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  console.log("Fetching URL:", apiURL);
  const res = await fetch(apiURL);

  const data = await res.json();

  // Create a response object and modify its headers to include CORS headers
  const response = NextResponse.json({ data });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');

  return response;
}

// Middleware for handling CORS preflight requests
export function middleware(request) {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
    return response;
  }
  return NextResponse.next();
}

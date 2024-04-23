import { NextRequest, NextResponse } from "next/server";

// API endpoint at localhost:3000/api/weather
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  
  // Ensure there is an address to query the weather data
  if (!address) {
    return new NextResponse(JSON.stringify({ error: "Address parameter is missing" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Allows all domains, adjust in production
      }
    });
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=c02ceeecd4e685ea17f27d6e09d41e0f`;

  console.log("Fetching URL:", url);
  const res = await fetch(url);

  const data = await res.json();
  
  // Create a response object and modify its headers to include CORS headers
  const response = NextResponse.json({ data });
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allows all domains
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specific methods allowed
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header'); // Specifies allowed headers

  return response;
}

// Middleware for handling CORS preflight requests
export function middleware(request) {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 }); // No content for OPTIONS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header'); // Include custom headers if needed
    return response;
  }
  return NextResponse.next();
}

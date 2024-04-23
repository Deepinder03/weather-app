import { NextRequest, NextResponse } from "next/server";

//localhost:3000/api/weather
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  let url = "https://api.openweathermap.org/data/2.5/weather?q=" +  address +  "&appid=" +
  "c02ceeecd4e685ea17f27d6e09d41e0f";

  if (address) {
    url = "https://api.openweathermap.org/data/2.5/weather?q=" +
      address +
      "&appid=" +
      "c02ceeecd4e685ea17f27d6e09d41e0f";
  } 

  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  
  // Create a response object and modify its headers to include CORS headers
  const response = NextResponse.json({ data });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allows all domains
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Allows only GET and OPTIONS methods
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Specifies allowable headers

  return response;
}

// Optional: You might also want to handle the OPTIONS method if your API expects preflight requests
export function middleware(request) {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
  return NextResponse.next();
}

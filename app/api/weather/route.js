import { NextRequest, NextResponse } from "next/server";
import Cors from 'nextjs-cors';

export async function middleware(req, ev) {
  await Cors(req, ev, {
    // Options
    methods: ['GET', 'HEAD', 'OPTIONS'],  // Allowed request methods
    origin: '*',  // Allow all origins - adjust as necessary for production
    optionsSuccessStatus: 200  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'OPTIONS') {
    // Handle OPTIONS Request
    return new Response('', { status: 204 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" +  address +  "&appid=" +
  "c02ceeecd4e685ea17f27d6e09d41e0f";
  if (address) {
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      address +
      "&appid=" +
      "c02ceeecd4e685ea17f27d6e09d41e0f";
  } 
  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  return NextResponse.json({ data });
}
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

import { NextResponse } from "next/server";
import React from "react";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Error when Registering" },
      { status: 500 }
    );
  }
}

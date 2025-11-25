import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import React from "react";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Error when Registering" },
      { status: 500 }
    );
  }
}

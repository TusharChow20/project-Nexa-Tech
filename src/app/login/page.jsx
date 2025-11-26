import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../api/auth/[...nextauth]/route";
import LoginPage from "@/Component/LoginPage";
import { redirect } from "next/navigation";

const Authentication = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return <LoginPage></LoginPage>;
};

export default Authentication;

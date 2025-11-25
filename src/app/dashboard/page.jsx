import UserInfo from "@/Component/UserInfo";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AuthProvider } from "../Providers";

export default async function Page() {
  const session = await getServerSession(AuthProvider);

  if (!session) {
    redirect("/login");
  }

  return <UserInfo />;
}

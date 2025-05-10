import type React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Only redirect if we're on the login page and have a session
  if (session && typeof window === "undefined") {
    redirect("/dashboard");
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/auth-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "loud",
  description: "Feel loud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="">
          <Toaster />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}

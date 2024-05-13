import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buy It Now",
  description: "This nextjs app is developed by Saad Alamgir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          <ToastContainer position="top-right" />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}

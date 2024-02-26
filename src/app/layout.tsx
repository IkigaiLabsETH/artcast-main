import { AppProvider } from "@/Context/AppContext";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ikigai ARTCAST V1",
  description:
    "An Ikigai Labs Farcaster client that enables you to sign in with Farcaster, see & create casts, and mint any cast as an NFT. Sign in to get started.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ikigai-artcast.vercel.app/",
    description:
      "A Farcaster client that enables you to sign in with Farcaster, see & create casts, and mint any cast as an NFT. Sign in to get started.",
    images: [
      {
        url: "/vibes.png",
        width: 800,
        height: 800,
        alt: "IKIGAI ARTCAST V1",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased bg-black text-white",
            fontSans.variable
          )}
        >
          <ToastContainer />

          <Header />
          <div className={cn("container mx-auto px-4 py-32 w-full h-full")}>
            {children}
          </div>
        </body>
      </AppProvider>
    </html>
  );
}

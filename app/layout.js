import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexora",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${inter.className} text-white bg-gradient-to-r from-[#6a3093] via-[#2c3e50] to-[#1f2937]`}
        >
          {/* bg-gradient-to-r from-[#0F2027] via-[#90e1fc] to-[#2C5364] */}
          {/* bg-[linear-gradient(to_right,#111827 _1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[length:40px_40px] */}

          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-black py-12">
            <div className="container mx-auto px-4 text-center text-gray-400">
              {/* Footer content */}
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "Country Intel",
  description: "Country discovery and analysis app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/components/convex-client-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocuMate - Effortless Rich Text Editing",
  description:
    "Create, edit, and collaborate on rich text documents seamlessly with DocuMate. Built with Next.js and Tiptap, it offers a sleek, user-friendly interface for all your writing needs.",
  keywords:
    "rich text editor, collaborative editing, Next.js, Tiptap, document editor, online editor, text editor, document creation",
  authors: [{ name: "Shariq Shaikh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

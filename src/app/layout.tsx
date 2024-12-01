import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosense Reader",
  description: "Cosense Reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className='antialiased [word-break:auto-phrase]'
      >
        {children}
      </body>
    </html>
  );
}

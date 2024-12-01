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
      <body>
        <div className="container mx-auto">
          <div className="content [word-break:auto-phrase]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

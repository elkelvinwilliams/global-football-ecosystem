import "@gfe/ui/src/tokens.css";
import "./globals.css";

export const metadata = {
  title: "GFE - Global Football Ecosystem",
  description: "The trusted operating system of world football.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}

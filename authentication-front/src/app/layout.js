import { Noto_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Authentication App",
  description: "Challenge by DevChallenges.io",
  type: "website",
};

const Noto = Noto_Sans({
    subsets: ['latin'],
    variable: '--font-notosans',
    weights: [400, 400, 500, 600, 700],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${Noto.variable} font-sans`}>
      <body>{children}</body>
    </html>
  );
}

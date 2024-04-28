import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/provider";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auction Heroes",
  description: "Online mUltiplayer IPL Auction  Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <CookiesProvider>
          <StoreProvider>{children}</StoreProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}

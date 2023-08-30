import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans, Poppins } from "next/font/google"
import Navbar from "./components/Navbar/Navbar"

const dm_sans = DM_Sans({ subsets: ["latin"] })
export const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "NFPaisanos",
  description: "Code Challenge by Nico Battaglia",
  keywords: [
    "nfts",
    "nft",
    "token",
    "marketplace",
    "paisanos",
    "paisanos.io",
    "eth",
    "ethereum",
    "bitcoin",
    "crypto",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} ${poppins.variable} `}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

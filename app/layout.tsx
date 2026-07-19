import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"StudySim — Aprenda, pratique e esteja pronto", description:"Flashcards, simulados inteligentes e progresso de estudos, mesmo offline.", manifest:"/manifest.json", icons:{icon:"/icon.svg"} };
export const viewport: Viewport = { themeColor:"#7166e8", width:"device-width", initialScale:1, viewportFit:"cover" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html> }

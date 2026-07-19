import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"StudySim — Aprenda, pratique e esteja pronto", description:"Flashcards, simulados inteligentes e progresso de estudos, mesmo offline.", applicationName:"StudySim", manifest:"/manifest.json", appleWebApp:{capable:true,title:"StudySim",statusBarStyle:"default"}, formatDetection:{telephone:false}, icons:{icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/icon-192.png",sizes:"192x192",type:"image/png"}],apple:"/icon-192.png"} };
export const viewport: Viewport = { themeColor:"#7166e8", width:"device-width", initialScale:1, viewportFit:"cover" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html> }

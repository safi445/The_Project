import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Camera, History, Scissors, User, GraduationCap } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Barber Consultation",
  description: "AI-powered barber consultation tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center px-6 z-50">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Scissors className="w-6 h-6 text-indigo-600" />
            <span>SmartBarber</span>
          </h1>
        </header>

        <main className="flex-1 pt-16 pb-20 overflow-y-auto">
          <div className="max-w-md mx-auto h-full">
            {children}
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-50">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
            <Camera className="w-6 h-6" />
            <span className="text-xs font-medium">Scan</span>
          </Link>
          <Link href="/recommendations" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
            <Scissors className="w-6 h-6" />
            <span className="text-xs font-medium">Styles</span>
          </Link>
          <Link href="/training" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xs font-medium">Learn</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
            <History className="w-6 h-6" />
            <span className="text-xs font-medium">History</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@/components/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salary Insights",
  description: "Employee salary management and analytics",
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
      <body className="min-h-full flex flex-col bg-gray-50">
        <QueryClientProvider>
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-gray-900">
                Salary Insights
              </a>
              <nav className="flex gap-6">
                <a
                  href="/"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </a>
                <a
                  href="/employees"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Employees
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}


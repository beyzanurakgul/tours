import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'My Reusable UI Project',
  description: 'Next.js 14 App Router + TypeScript + TailwindCSS + Fake API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-100 text-gray-800 min-h-screen w-screen overflow-x-hidden  flex flex-col font-serif">
        
        {/* 🔹 Sabit Navbar (Header) */}
        <Navbar />

        {/* 🔹 Ana İçerik (Header ve Footer arasında kaydırılabilir) */}
        <main className="flex-1 overflow-y-auto pt-[60px] pb-[60px] w-screen">
          {children}
        </main>

        {/* 🔹 Sabit Footer */}
        <footer className="bg-gray-800 text-white py-2 text-center w-full fixed bottom-0 left-0 right-0 z-50 shadow-md">
          <p className="text-sm sm:text-md">
            © {new Date().getFullYear()} My Reusable UI Project. All rights reserved.
          </p>
        </footer>

      </body>
    </html>
  );
}

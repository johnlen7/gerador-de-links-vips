import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Cart from "@/components/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BatataFood - Delivery de Batatas",
  description: "O melhor delivery de batatas da cidade! Fritas, assadas, doces e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <Cart />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg font-semibold mb-2">🥔 BatataFood</p>
              <p className="text-gray-400 text-sm">
                O melhor delivery de batatas da cidade
              </p>
              <p className="text-gray-500 text-xs mt-4">
                © 2025 BatataFood. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

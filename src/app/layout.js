import './globals.css';
import Navbar from '../components/Navbar';
import {AuthProvider} from "@/context/AuthContext";
import {CartProvider} from "@/context/CartContext";

export const metadata = {
    title: "NextGen",
    description: "NextGen - One stop shopping for your new gadgets."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col font-sans text-gray-800'>
        <AuthProvider>
            <CartProvider>
                <Navbar />
                <main className='flex-grow container mx-auto px-4 py-8 max-w-4xl'>
                    {children}
                </main>
                <footer className='text-center text-gray-500 py-4 text-sm'>
                    &copy; {new Date().getFullYear()} NextGen. All rights reserved.
                </footer>
            </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

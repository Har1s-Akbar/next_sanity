import Navbar from "./components/Navbar";
import { Providers } from "./components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "./context/context";

const inter = Inter({ subsets: ["latin"],
                      preload:true
                    });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.className} bg-white text-black dark:bg-gray-900 dark:selection:bg-gray-900 dark:text-white h-full selection:bg-gray-50`}
      >
        <GlobalContextProvider>
          <Providers>
            <Navbar />
            <main className="flex mx-auto px-4 sm:px-6 lg:px-8 justify-between">
                {children}
            </main>
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

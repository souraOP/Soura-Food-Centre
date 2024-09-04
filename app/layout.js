import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import { neobrutalism } from '@clerk/themes'
import '@smastrom/react-rating/style.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soura Food App",
  description: "Soura Food Center is famous for providing special food items to their customers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: [neobrutalism],
    }}>
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
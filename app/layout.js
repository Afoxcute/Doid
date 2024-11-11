"use client";
import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { OktoProvider, BuildType } from 'okto-sdk-react';
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

const OKTO_CLIENT_API_KEY = "aaacfac6-408a-4607-a994-ee9271151822";

// export const metadata = {
//   title: "BasearpsID",
//   description: "Seamless Institution Experience: Identity, Payments, and Access",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
          <div className="max-w-screen-2xl mx-auto">
            <Providers>{children}</Providers>
          </div>
        </OktoProvider>
      </body>
    </html>
  );
}

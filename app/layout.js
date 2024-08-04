import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Provider from "./Context/Provider";

export const metadata = {
  title: {
    absolute: "",
    default: "goldendrakes",
    template: "%s" 
  },
  description: "Golden Drakes Club Official Website",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: '/site.webmanifest'
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div>
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}

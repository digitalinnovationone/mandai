import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppHeader from "@/shared/components/AppHeader";
import AppFooter from "@/shared/components/AppFooter";

export const metadata: Metadata = {
  title: {
    template: "%s | Mandaí",
    default: "Mandaí — Peça e retire no balcão",
  },
  description:
    "Peça online na Mandaí e retire no balcão. Sem entrega, sem taxa, comida quentinha.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <AppHeader />
          <main>{children}</main>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Sacola",
};

export default function SacolaPage() {
  return <CartPageClient />;
}

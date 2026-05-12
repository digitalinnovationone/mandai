"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Store } from "lucide-react";
import { useCart } from "@/modules/cart/context";

interface AppHeaderProps {
  showSearch?: boolean;
  defaultQuery?: string;
}

export default function AppHeader({
  showSearch = true,
  defaultQuery = "",
}: AppHeaderProps) {
  const router = useRouter();
  const { state } = useCart();

  const cartCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)
      ?.value?.trim();
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="app-header">
      <div className="inner">
        {/* Brand */}
        <Link href="/" className="brand">
          <Image
            src="/assets/logo-mark.svg"
            alt="Mandaí"
            width={36}
            height={36}
            className="mark"
            priority
          />
          <span className="word">mandaí</span>
        </Link>

        {/* Pickup pill */}
        <button className="pickup-pill" type="button" aria-label="Trocar local de retirada">
          <span className="ico">
            <Store size={14} />
          </span>
          <span className="txt">
            <span className="lbl">Retirar em</span>
            <span className="val">Vila Madalena ▾</span>
          </span>
        </button>

        {/* Search bar */}
        {showSearch && (
          <form className="search-bar" onSubmit={handleSearch} role="search">
            <span className="ico" aria-hidden="true">
              <Search size={16} />
            </span>
            <input
              name="q"
              type="search"
              placeholder="Busca restaurante, prato ou cozinha…"
              defaultValue={defaultQuery}
              aria-label="Buscar restaurante, prato ou cozinha"
            />
          </form>
        )}

        {/* Cart button */}
        <Link href="/sacola" className="bag-btn" aria-label={`Sacola${cartCount > 0 ? `, ${cartCount} ${cartCount === 1 ? "item" : "itens"}` : ""}`}>
          <ShoppingBag size={16} />
          <span>Sacola</span>
          {cartCount > 0 && (
            <span className="count" aria-hidden="true">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

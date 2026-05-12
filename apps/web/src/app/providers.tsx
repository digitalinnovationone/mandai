"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/modules/cart/context";

export default function Providers({ children }: { children: ReactNode }) {
  // Create QueryClient inside useState so it's stable per render (avoids SSR mismatch)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR: don't retry on server
            retry: typeof window === "undefined" ? false : 2,
            staleTime: 60 * 1000, // 1 minute
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
}

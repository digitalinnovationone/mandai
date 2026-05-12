"use client";

import { useMutation } from "@tanstack/react-query";
import { createOrder, type CreateOrderInput } from "../services/orders.api";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrder(input),
  });
}

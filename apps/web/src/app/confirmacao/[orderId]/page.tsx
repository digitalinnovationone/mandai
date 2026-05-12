import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchOrder,
  type OrderConfirmation,
} from "@/modules/orders/services/orders.api";
import ConfirmationClient from "./ConfirmationClient";

interface Props {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  try {
    const order = await fetchOrder(orderId);
    return { title: `Pedido ${order.code} confirmado!` };
  } catch {
    return { title: "Pedido confirmado" };
  }
}

export default async function ConfirmacaoPage({ params }: Props) {
  const { orderId } = await params;

  let order: OrderConfirmation;
  try {
    order = await fetchOrder(orderId);
  } catch {
    notFound();
  }

  return <ConfirmationClient order={order} />;
}

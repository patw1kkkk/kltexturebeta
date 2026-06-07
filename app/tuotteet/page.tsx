import type { Metadata } from "next";
import { ProductsListPage } from "@/components/products/ProductsListPage";

export const metadata: Metadata = {
  title: "Tuotteet",
  description: "KL Texture -tuotteet selkeästi vertailtuna: volyymi, tekstuuri, viimeistely ja hoito."
};

export default function ProductsPage() {
  return <ProductsListPage />;
}

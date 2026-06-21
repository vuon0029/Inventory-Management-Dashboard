import type { Product } from "../types/product";

const PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos";

type PlaceholderItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(PLACEHOLDER_URL);

  if (!response.ok) {
    throw new Error("Error: Failed to fetch placeholder items");
  }

  const placeholderData: PlaceholderItem[] = await response.json();

  return placeholderData.slice(0, 30).map((product) => ({
    id: product.id.toString(),
    productName: product.title,
    quantity: product.id + 1, // mock quantity, should be greater than 0
  }));
};

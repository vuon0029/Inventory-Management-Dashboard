import React from "react";

import "./App.css";
import type { Product } from "./types/product";
import { fetchProducts } from "./api/inventoryApi";

function App() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Unable to load products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p role="alert">{error}</p>
          ) : (
            <div>
              {products.map((product) => {
                return <p key={product.id}>{product.productName}</p>;
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

import React from "react";

import "./App.css";
import type { Product } from "./types/product";
import { fetchProducts } from "./api/inventoryApi";
import { ProductTable } from "./components/ProductTable/ProductTable";

function App() {
  const ITEMS_PER_PAGE = 10;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [products, setProducts] = React.useState<Product[]>([]);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  );
  const [currentPage, setCurrentPage] = React.useState(1);

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

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) => {
      const comparison = a.productName.localeCompare(b.productName);

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [products, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / ITEMS_PER_PAGE),
  );

  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  const handleSortToggle = () => {
    setSortDirection((currentDirection) =>
      currentDirection === "asc" ? "desc" : "asc",
    );
  };

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
              <ProductTable
                products={paginatedProducts}
                onSortToggle={handleSortToggle}
              />

              {/* "PREVIOUS" and "NEXT" buttons for pagination */}
              <div>
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

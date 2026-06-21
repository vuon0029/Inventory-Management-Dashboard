import React from "react";

import "./App.css";
import type { Product } from "./types/product";
import { fetchProducts } from "./api/inventoryApi";
import { ProductTable } from "./components/ProductTable/ProductTable";
import SearchBar from "./components/SearchBar/SearchBar";
import { ProductForm } from "./components/Form/ProductForm";

function App() {
  const ITEMS_PER_PAGE = 10;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [searchTerm, setSearchTerm] = React.useState("");
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

  // #region ADD PRODUCT
  function handleAddProduct(product: Omit<Product, "id">) {
    setProducts((currentProducts) => [
      {
        // randomize the Product ID
        id: crypto.randomUUID(),
        ...product,
      },
      ...currentProducts,
    ]);

    setCurrentPage(1);
  }
  // #endregion

  // #region FILTERING/ SEARCHING
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredProducts = React.useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return products;
    }

    return products.filter((product) =>
      product.productName.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [products, searchTerm]);
  // #endregion

  // #region SORTING "asc" | "desc"
  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const comparison = a.productName.localeCompare(b.productName);

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredProducts, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / ITEMS_PER_PAGE),
  );

  const handleSortToggle = () => {
    setSortDirection((currentDirection) =>
      currentDirection === "asc" ? "desc" : "asc",
    );
  };
  // #endregion

  // #region PAGINATION
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);
  // #endregion

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
              <ProductForm onAddProduct={handleAddProduct} />
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
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

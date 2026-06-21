import type { Product } from "../../types/product";
import styles from "./ProductTable.module.css";

type ProductTableProps = {
  products: Product[];
  sortDirection: "asc" | "desc";
  onSortToggle: () => void;
};

export function ProductTable({
  products,
  onSortToggle,
  sortDirection,
}: ProductTableProps) {
  if (products.length === 0) {
    return <p className={styles.emptyState}>No products match your search.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              <button
                className={styles.sortButton}
                type="button"
                onClick={onSortToggle}
              >
                Product Name
                <span aria-hidden="true">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              </button>
            </th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

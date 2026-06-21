import type { Product } from "../../types/product";

type ProductTableProps = {
  products: Product[];
  sortDirection?: "asc" | "desc";
  onSortToggle: () => void;
};

export function ProductTable({
  products,
  onSortToggle,
  sortDirection,
}: ProductTableProps) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>
            <button type="button" onClick={onSortToggle}>
              Product Name {sortDirection === "asc" ? "ASC" : "DESC"}
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
  );
}

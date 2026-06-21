import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <label className={styles.label} htmlFor="product-search">
        Search Products
      </label>

      <input
        className={styles.input}
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by product name"
      />
    </div>
  );
}

export default SearchBar;

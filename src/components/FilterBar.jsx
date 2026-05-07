import styles from "./FilterBar.module.css";

const BRANDS = ["All", "BMW", "Mercedes-Benz", "Audi", "Rolls-Royce", "Porsche", "Lexus"];

const SORT_OPTIONS = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "year", label: "Newest First" },
  { value: "km", label: "Lowest KM" },
];

export default function FilterBar({ filter, sort, onFilter, onSort, resultCount }) {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>Filter</span>

      {BRANDS.map((brand) => (
        <button
          key={brand}
          className={`${styles.pill} ${filter === brand ? styles.active : ""}`}
          onClick={() => onFilter(brand)}
        >
          {brand}
        </button>
      ))}

      <span className={styles.count}>{resultCount} cars</span>

      <select
        className={styles.sort}
        value={sort}
        onChange={(e) => onSort(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
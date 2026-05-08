// ============================================================
// Navbar.jsx — Sticky top navigation bar
// ============================================================
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";


export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      {/* Brand logo — always routes home */}
      <Link to="/" className={styles.logo}>
        Altura<span>Drive</span>
      </Link>

      <div className={styles.links}>
        <Link
          to="/"
          className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        >
          Inventory
        </Link>
        <Link to="/about" className={styles.link}>
  About
</Link>

        <Link to="/" className={styles.cta}>
          View All Cars
        </Link>
      </div>
    </nav>
  );
}
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className={styles.footer}>
      
      {/* MAIN GRID */}
      <div className={styles.grid}>

        {/* BRAND */}
        <div>
          <p className={styles.logo}>
            Altura<span>Drive</span>
          </p>

          <p className={styles.desc}>
            Bengaluru’s most trusted destination for certified pre-owned luxury
            vehicles. Every car, a masterpiece.
          </p>
        </div>

        {/* LINKS */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul>
            <li>Inventory</li>
            <li>
  <Link to="/about">About Us</Link>
</li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li>Blog</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Contact</h4>
          <ul>
            <li>+91 8296321347</li>
            <li>hello@alturadrive.in</li>
            <li>Bengaluru, Karnataka</li>
            
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()}Altura Drive </p>
        <p>Luxury Cars · Bengaluru</p>
      </div>

    </footer>
  );
}

export default Footer;
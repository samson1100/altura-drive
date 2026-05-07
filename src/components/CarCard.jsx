// ============================================================
// CarCard.jsx — Single car card shown in the inventory grid
// Props: car (object)
// ============================================================
import { useNavigate } from "react-router-dom";
import { fmtPrice, fmtKm } from "../utils";
import styles from "./CarCard.module.css";

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const handleView = (e) => {
    e.stopPropagation();
    navigate(`/car/${car.id}`);
  };

  return (
    <article className={styles.card} onClick={() => navigate(`/car/${car.id}`)}>
      {/* Optional badge (Featured / Premium / Hybrid …) */}
      {car.badge && <span className={styles.badge}>{car.badge}</span>}

      {/* Car image */}
      <div className={styles.imgWrap}>
        <img src={car.img} alt={`${car.brand} ${car.name}`} loading="lazy" />
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <p className={styles.brand}>{car.brand}</p>
        <h2 className={styles.name}>{car.name}</h2>

        {/* Quick specs row */}
        <div className={styles.specs}>
          <span className={styles.spec}>{car.year}</span>
          <span className={styles.specDivider}>·</span>
          <span className={styles.spec}>{fmtKm(car.km)}</span>
          <span className={styles.specDivider}>·</span>
          <span className={styles.spec}>{car.fuel}</span>
        </div>

        {/* Price + CTA */}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <small className={styles.priceLabel}>Starting at</small>
            <span className={styles.price}>{fmtPrice(car.price)}</span>
          </div>
          <button className={styles.viewBtn} onClick={handleView}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cars from "../data/cars";
import { fmtPrice, fmtKm, estimateEmi } from "../utils";
import BookingModal from "../components/BookingModal";
import styles from "./CarDetail.module.css";

function SpecTile({ label, value }) {
  return (
    <div className={styles.specTile}>
      <span className={styles.specLabel}>{label}</span>
      <span className={styles.specValue}>{value}</span>
    </div>
  );
}

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));

  const [galleryIdx, setGalleryIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [down, setDown] = useState(20);

  if (!car) {
    return (
      <div className={styles.notFound}>
        <h2>Car not found</h2>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Back to Inventory
        </button>
      </div>
    );
  }

  const baseEmi = estimateEmi(car.price);
  const adjustedEmi = Math.round((car.price * (1 - down / 100)) * 0.0095);

  return (
    <div className={styles.page}>
      
      {/* BACK */}
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back to Inventory
      </button>

      <div className={styles.layout}>

        {/* LEFT SIDE */}
        <div>
          <div className={styles.galleryMain}>
            <img src={car.imgs[galleryIdx]} alt={car.name} />
          </div>

          <div className={styles.thumbStrip}>
            {car.imgs.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${
                  galleryIdx === i ? styles.thumbActive : ""
                }`}
                onClick={() => setGalleryIdx(i)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>

          <div className={styles.features}>
            <h3 className={styles.featuresTitle}>Key Highlights</h3>
            <ul className={styles.featuresList}>
              {car.features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <span className={styles.featureDot} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.infoPanel}>

          <div>
            <p className={styles.brand}>{car.brand}</p>
            <h1 className={styles.carName}>{car.name}</h1>
            <p className={styles.location}>{car.location}</p>
          </div>

          {/* PRICE */}
          <div className={styles.priceBlock}>
            <p className={styles.priceLabel}>Asking Price</p>
            <p className={styles.price}>{fmtPrice(car.price)}</p>
            <p className={styles.emi}>
              Est. EMI from ₹{new Intl.NumberFormat("en-IN").format(baseEmi)}/month
            </p>
          </div>

          {/* EMI SLIDER */}
          <div className={styles.priceBlock}>
            <p className={styles.priceLabel}>EMI Calculator</p>

            <p className={styles.emi}>Down Payment: {down}%</p>

            <input
              type="range"
              min="10"
              max="80"
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              style={{ width: "100%", margin: "10px 0" }}
            />

            <p className={styles.price}>
              ₹{new Intl.NumberFormat("en-IN").format(adjustedEmi)}/month
            </p>
          </div>

          {/* SPECS */}
          <div className={styles.specsGrid}>
            <SpecTile label="Year" value={car.year} />
            <SpecTile label="KM" value={fmtKm(car.km)} />
            <SpecTile label="Fuel" value={car.fuel} />
            <SpecTile label="Transmission" value={car.transmission} />
            <SpecTile label="Ownership" value={car.ownership} />
            <SpecTile label="Color" value={car.color} />
            <SpecTile label="Engine" value={car.engine} />
            <SpecTile label="Power" value={car.power} />
          </div>

          {/* CTA */}
          <div className={styles.ctas}>
            <button
              className={styles.bookBtn}
              onClick={() => setShowModal(true)}
            >
              Book Test Drive
            </button>

            <a
              href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(
                `Hi, I'm interested in ${car.brand} ${car.name}`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.enquireBtn}>
                WhatsApp Enquiry
              </button>
            </a>
          </div>

          {/* TRUST */}
          <div className={styles.trust}>
            <p className={styles.trustLabel}>Why Altura?</p>
            <p className={styles.trustText}>
              RC verified • Loan clear • Inspection guaranteed • Free test drive
            </p>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default CarDetail;
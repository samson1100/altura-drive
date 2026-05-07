import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { fmtPrice, fmtKm, estimateEmi } from "../utils";
import BookingModal from "../components/BookingModal";
import styles from "./CarDetail.module.css";

function SpecTile({ label, value }) {
  return (
    <div className={styles.specTile}>
      <span className={styles.specLabel}>{label}</span>
      <span className={styles.specValue}>{value || "-"}</span>
    </div>
  );
}

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [down, setDown] = useState(20);

  useEffect(() => {
    async function fetchCar() {
      try {
        const carRef = doc(db, "cars", id);
        const carSnap = await getDoc(carRef);

        if (carSnap.exists()) {
          setCar({ id: carSnap.id, ...carSnap.data() });
        }
      } catch (error) {
        console.log("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [id]);

  if (loading) {
    return <div className={styles.notFound}>Loading car...</div>;
  }

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

  const images = car.imgs?.length ? car.imgs : car.img ? [car.img] : [];

  // REVISED LOGIC: Splits on commas, newlines, or carriage returns from Firebase
  const featureList =
    typeof car.features === "string"
      ? car.features
          .split(/[,\n\r]+/) 
          .map((item) => item.trim())
          .filter(Boolean)
      : Array.isArray(car.features)
      ? car.features
          .map((item) => String(item).trim())
          .filter(Boolean)
      : [];

  const baseEmi = estimateEmi(Number(car.price || 0));
  const adjustedEmi = Math.round(
    Number(car.price || 0) * (1 - down / 100) * 0.0095
  );

  function prevImage() {
    if (!images.length) return;
    setGalleryIdx(galleryIdx === 0 ? images.length - 1 : galleryIdx - 1);
  }

  function nextImage() {
    if (!images.length) return;
    setGalleryIdx(galleryIdx === images.length - 1 ? 0 : galleryIdx + 1);
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back to Inventory
      </button>

      <div className={styles.layout}>
        <div>
          <div className={styles.galleryMain}>
            {images.length > 1 && (
              <button className={styles.navBtnLeft} onClick={prevImage}>
                ‹
              </button>
            )}

            {images.length > 0 ? (
              <img src={images[galleryIdx]} alt={`${car.brand} ${car.name}`} />
            ) : (
              <p>No image available</p>
            )}

            {images.length > 1 && (
              <button className={styles.navBtnRight} onClick={nextImage}>
                ›
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.thumbStrip}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${
                    galleryIdx === i ? styles.thumbActive : ""
                  }`}
                  onClick={() => setGalleryIdx(i)}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}

          <div className={styles.features}>
            <h3 className={styles.featuresTitle}>Key Highlights</h3>
            <ul className={styles.featuresList}>
              {featureList.map((f, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.featureDot} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.infoPanel}>
          <div>
            <p className={styles.brand}>{car.brand}</p>
            <h1 className={styles.carName}>{car.name}</h1>
            <p className={styles.location}>{car.location}</p>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.priceLabel}>Asking Price</p>
            <p className={styles.price}>{fmtPrice(Number(car.price || 0))}</p>
            <p className={styles.emi}>
              Est. EMI from ₹
              {new Intl.NumberFormat("en-IN").format(baseEmi)}/month
            </p>
          </div>

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

          <div className={styles.specsGrid}>
            <SpecTile label="Year: " value={car.year} />
            <SpecTile label="KM: " value={fmtKm(Number(car.km || 0))} />
            <SpecTile label="Registration: " value={car.registrationState} />
            <SpecTile label="Fuel: " value={car.fuel} />
            <SpecTile label="Transmission: " value={car.transmission} />
            <SpecTile label="Ownership: " value={car.ownership} />
            <SpecTile label="Color: " value={car.color} />
            <SpecTile label="Engine: " value={car.engine} />
            <SpecTile label="Power: " value={car.power} />
          </div>

          <div className={styles.ctas}>
            <button
              className={styles.bookBtn}
              onClick={() => setShowModal(true)}
            >
              Book Test Drive
            </button>

            <a
              href={`https://wa.me/918296321347?text=${encodeURIComponent(
                `Hi, I'm interested in ${car.brand} ${car.name}`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.enquireBtn}>WhatsApp Enquiry</button>
            </a>
          </div>

          <div className={styles.trust}>
            <p className={styles.trustLabel}>Why Altura Drive?</p>
            <p className={styles.trustText}>
              Zero commission • Clear documentation • Ready for inspection •
              Available for test drive
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default CarDetail;
import { useState } from "react";
import { fmtPrice, todayISO } from "../utils";
import styles from "./BookingModal.module.css";

const INITIAL_FORM = { name: "", phone: "", date: "", time: "" };

export default function BookingModal({ car, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit mobile number";
    if (!form.date) errs.date = "Please pick a date";
    if (!form.time) errs.time = "Please pick a time";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    console.log("Booking:", {
      car: `${car.brand} ${car.name}`,
      price: fmtPrice(car.price),
      ...form,
    });

    setSubmitted(true);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              {submitted ? "Booking Confirmed" : "Book Test Drive"}
            </h2>
            <p className={styles.subtitle}>
              {submitted
                ? "We'll reach out within 2 hours."
                : "Select your preferred slot below"}
            </p>
          </div>

          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.body}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>You're All Set!</h3>

              <p className={styles.successMsg}>
                We'll call you at <strong>{form.phone}</strong> for{" "}
                <strong>{car.brand} {car.name}</strong> on{" "}
                <strong>{form.date} at {form.time}</strong>
              </p>

              <button className={styles.doneBtn} onClick={onClose}>
                Done
              </button>
            </div>
          ) : (
            <>
              <div className={styles.carStrip}>
                <img src={car.img} alt={car.name} className={styles.carThumb} />
                <div>
                  <p className={styles.carName}>{car.brand} {car.name}</p>
                  <p className={styles.carPrice}>{fmtPrice(car.price)}</p>
                </div>
              </div>

              <input
                className={styles.input}
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className={styles.input}
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <div className={styles.row}>
                <input
                  className={styles.input}
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />

                <input
                  className={styles.input}
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>

              <button className={styles.submitBtn} onClick={handleSubmit}>
                Confirm Booking
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
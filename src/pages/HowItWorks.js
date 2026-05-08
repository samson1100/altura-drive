import styles from "./InfoPages.module.css";

function HowItWorks() {
  return (
    <main className={styles.page}>
      <section className={styles.aboutHero}>
        <p className={styles.badge}>How It Works</p>

        <h1>
          A cleaner way to buy <span>luxury cars.</span>
        </h1>

        <p>
          Altura Drive helps serious buyers discover verified premium cars,
          review clear details, book inspections, and move faster without
          hidden commissions or confusing paperwork.
        </p>
      </section>

      <section className={styles.premiumGrid}>
        <div className={styles.premiumCard}>
          <span>01</span>
          <h3>Explore Inventory</h3>
          <p>
            Browse available luxury cars with photos, price, mileage,
            specifications, and ownership details.
          </p>
        </div>

        <div className={styles.premiumCard}>
          <span>02</span>
          <h3>Shortlist Your Car</h3>
          <p>
            Compare cars based on budget, brand, condition, features,
            registration state, and inspection readiness.
          </p>
        </div>

        <div className={styles.premiumCard}>
          <span>03</span>
          <h3>Book Test Drive</h3>
          <p>
            Send your details through WhatsApp or the test drive form and our
            team will coordinate the viewing.
          </p>
        </div>
      </section>

      <section className={styles.statement}>
        <p className={styles.badge}>Our Process</p>

        <h2>
          From enquiry to inspection, we keep it <span>transparent.</span>
        </h2>

        <p>
          Once you enquire, we share the car details, documentation status,
          inspection availability, and next steps clearly. No pressure selling,
          no hidden commission, and no unnecessary delays.
        </p>

        <p>
          If the car matches your requirement, we help you schedule a test
          drive, verify paperwork, and move toward purchase with confidence.
        </p>
      </section>
    </main>
  );
}

export default HowItWorks;
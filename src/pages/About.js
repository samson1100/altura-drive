import styles from "./InfoPages.module.css";

function About() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.badge}>About Altura Drive</p>

        <h1>
          Luxury cars, curated with trust.
        </h1>

        <p>
          Altura Drive is a Bengaluru-based premium car marketplace built for
          serious buyers looking for verified luxury vehicles without hidden
          commissions, unclear paperwork, or wasted time.
        </p>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h3>Zero Commission</h3>
          <p>
            We believe buyers should get clear pricing without unnecessary
            middleman charges.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Verified Inventory</h3>
          <p>
            Every listed car is checked for documentation, ownership, and
            inspection readiness.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Premium Experience</h3>
          <p>
            From enquiry to test drive, we keep the process simple, fast, and
            transparent.
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <h2>Why we exist</h2>

        <p>
          Buying a luxury car in India should not feel risky. Buyers often face
          confusing pricing, unclear documents, poor communication, and hidden
          broker margins. Altura Drive was created to make premium car discovery
          cleaner and more trustworthy.
        </p>

        <p>
          Our goal is simple: show genuine cars, present clear details, and help
          buyers connect quickly for inspection and test drives.
        </p>
      </section>
    </main>
  );
}

export default About;
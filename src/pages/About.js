import styles from "./InfoPages.module.css";

function About() {
  return (
    <main className={styles.page}>
      <section className={styles.aboutHero}>
        <p className={styles.badge}>About Altura Drive</p>

        <h1>
          Luxury cars, curated with <span>trust.</span>
        </h1>

        <p>
          Altura Drive is a Bengaluru-based premium car marketplace for serious
          buyers looking for verified luxury vehicles, clear documentation, and
          a smoother way to book inspections and test drives.
        </p>
      </section>

      <section className={styles.premiumGrid}>
        <div className={styles.premiumCard}>
          <span>01</span>
          <h3>Zero Commission</h3>
          <p>Transparent pricing without unnecessary middleman charges.</p>
        </div>

        <div className={styles.premiumCard}>
          <span>02</span>
          <h3>Verified Inventory</h3>
          <p>Cars checked for ownership, paperwork, and inspection readiness.</p>
        </div>

        <div className={styles.premiumCard}>
          <span>03</span>
          <h3>Premium Experience</h3>
          <p>From enquiry to test drive, the process stays simple and clear.</p>
        </div>
      </section>

      <section className={styles.statement}>
        <p className={styles.badge}>Why We Exist</p>

        <h2>
          Buying a luxury car should feel <span>exciting</span>, not risky.
        </h2>

        <p>
          Luxury car buyers often face unclear pricing, incomplete documents,
          poor communication, and hidden broker margins. Altura Drive was built
          to make premium car discovery cleaner, sharper, and more trustworthy.
        </p>

        <p>
          Our goal is simple: present genuine cars, clear details, and fast
          access to inspection and test drives.
        </p>

        <p>
          <p>
          You might wonder how we make money. The truth is, we don't—not here.
          Altura Drive is a pure passion project, created simply for the love of the game and 
          the thrill of the cars.
        </p>
        </p>
      </section>
    </main>
  );
}

export default About;
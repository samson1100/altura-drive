import { useMemo, useState } from "react";
import cars from "../data/cars";
import CarCard from "../components/CarCard";
import FilterBar from "../components/FilterBar";
import styles from "./Home.module.css";

function sortCars(list, sort) {
  const arr = [...list];

  if (sort === "price-asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "year") return arr.sort((a, b) => b.year - a.year);
  if (sort === "km") return arr.sort((a, b) => a.km - b.km);

  return arr;
}

function Home() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "" });

  const displayed = useMemo(() => {
    let list = [...cars];

    if (filter !== "All") {
      list = list.filter((car) => car.brand === filter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (car) =>
          car.brand.toLowerCase().includes(q) ||
          car.name.toLowerCase().includes(q) ||
          car.fuel.toLowerCase().includes(q)
      );
    }

    return sortCars(list, sort);
  }, [filter, sort, search]);

  function handleLeadSubmit(e) {
    e.preventDefault();

    if (!lead.name || !lead.phone) {
      alert("Please enter name and phone number");
      return;
    }

    const msg = `Hi, my name is ${lead.name}. I am interested in your luxury car inventory. Please contact me at ${lead.phone}.`;
    window.open(
      `https://wa.me/918296321347?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <p className={styles.badge}>Bengaluru • Certified Luxury Inventory</p>

          <h1>
            Curated Luxury Cars.
            <br />
            <span>Ready for Test Drive.</span>
          </h1>

          <p className={styles.sub}>
            Handpicked BMW, Mercedes-Benz, Audi, Porsche and more — verified,
            inspected, and available for serious buyers.          

            WHY US?
          </p>

          <div className={styles.trustBadges}>
            <div>Zero commission
</div>
            <div>Clear documentation
</div>
            <div>Ready for inspection
</div>
            <div>Available for test drive</div>
          </div>
        </div>

        <form className={styles.leadBox} onSubmit={handleLeadSubmit}>
          <h3>Get Priority Access</h3>
          <p>Share your details and we’ll send available cars directly.</p>

          <input
            type="text"
            placeholder="Your Name"
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
          />

          <button type="submit">Send on WhatsApp</button>
        </form>
      </section>

      <section className={styles.inventory} id="inventory">
        <div className={styles.topRow}>
          <div>
            <h2>Available Inventory</h2>
            <p>{displayed.length} cars matching your search</p>
          </div>

          <input
            className={styles.search}
            type="text"
            placeholder="Search BMW, Audi, Diesel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FilterBar
          filter={filter}
          sort={sort}
          onFilter={setFilter}
          onSort={setSort}
          resultCount={displayed.length}
        />

        <div className={styles.grid}>
          {displayed.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
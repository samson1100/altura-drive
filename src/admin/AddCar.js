import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import ImageUpload from "./ImageUpload";

function AddCar() {
  const initialForm = {
    brand: "",
    name: "",
    year: "",
    price: "",
    km: "",
    fuel: "",
    ownership: "",
    location: "Bengaluru",
    color: "",
    transmission: "",
    engine: "",
    power: "",
    badge: "",
    img: "",
    imgs: [],
    features: "",
  };

  const [form, setForm] = useState(initialForm);

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "cars"), {
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        km: Number(form.km),

        // You type: Sunroof,Audio,Camera
        // Firebase stores as array: ["Sunroof", "Audio", "Camera"]
        features: form.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        createdAt: new Date(),
      });

      alert("Car added successfully!");
      setForm(initialForm);
    } catch (error) {
      console.log(error);
      alert("Error adding car");
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Add Car</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          maxWidth: "900px",
          marginTop: "1rem",
        }}
      >
        {Object.keys(form)
          .filter(
            (field) =>
              field !== "img" &&
              field !== "imgs" &&
              field !== "features"
          )
          .map((field) => (
            <input
              key={field}
              placeholder={field}
              value={form[field]}
              onChange={(e) => updateField(field, e.target.value)}
              style={{ padding: "12px" }}
            />
          ))}

        <div style={{ gridColumn: "1 / -1" }}>
          <textarea
            placeholder="Features separated by commas: Panoramic Sunroof,Harman Kardon Audio,360 Camera"
            value={form.features}
            onChange={(e) => updateField("features", e.target.value)}
            style={{
              width: "100%",
              minHeight: "110px",
              padding: "12px",
              resize: "vertical",
              lineHeight: "1.6",
            }}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <p>Main Image</p>

          <ImageUpload onUpload={(url) => setForm({ ...form, img: url })} />

          {form.img && (
            <img
              src={form.img}
              alt="Main"
              style={{
                width: "220px",
                marginTop: "1rem",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <p>Gallery Images</p>

          <ImageUpload
            onUpload={(url) =>
              setForm({
                ...form,
                imgs: [...form.imgs, url],
              })
            }
          />

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            {form.imgs.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            gridColumn: "1 / -1",
            padding: "14px",
            background: "#c9a84c",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AddCar;
import { useState } from "react";

function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = new FormData();

      data.append("file", file);

      data.append("upload_preset", "alturadrive");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dgfzbbvnz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();

      onUpload(uploaded.secure_url);

      alert("Image uploaded!");
    } catch (error) {
      console.log(error);

      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />

      {uploading && <p>Uploading...</p>}
    </div>
  );
}

export default ImageUpload;
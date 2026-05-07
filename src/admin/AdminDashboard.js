import AddCar from "./AddCar";

function AdminDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        padding: "4rem",
      }}
    >
      <h1>Altura Drive Admin</h1>

      <AddCar />
    </div>
  );
}

export default AdminDashboard;
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Dashboard</h2>
      <p>Usuário logado</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      const mensagem =
        error.response?.data?.error || "Erro ao fazer login";
      alert(mensagem);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={{ display: "grid", gap: "12px", maxWidth: "320px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: "16px" }}>
        Não tem conta? <Link to="/cadastro">Ir para cadastro</Link>
      </p>
    </div>
  );
}

export default Login;
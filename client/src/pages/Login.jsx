import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// 1. MUDANÇA: Importar o supabase direto (em vez do authService)
import { supabase } from "../lib/supabase"; 
import FeedbackMessage from "../components/FeedbackMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      // 2. MUDANÇA: Chamar o Supabase no cliente em vez da sua API
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error; // Se o Supabase der erro, ele pula para o catch

      // 3. MUDANÇA: O caminho dos dados muda de 'data.user' para 'data.session.user'
      localStorage.setItem("token", data.session.access_token);
      localStorage.setItem("refresh_token", data.session.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setFeedback({ type: "success", message: "Login realizado com sucesso!" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (error) {
      // Mantive seu tratamento de erro, apenas adaptado para o erro do Supabase
      const mensagem = error.message || "Erro ao fazer login";
      setFeedback({ type: "error", message: mensagem });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-card" style={{ maxWidth: "480px" }}>
          <h1 className="page-title">Login</h1>
          <p className="page-subtitle">Acesse sua conta para continuar</p>

          <form onSubmit={handleLogin} className="form-grid" style={{ marginTop: "24px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <div className="actions-row">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <Link to="/cadastro">
                <button type="button" className="btn-secondary" disabled={loading}>
                  Ir para cadastro
                </button>
              </Link>
            </div>
          </form>

          <FeedbackMessage type={feedback.type} message={feedback.message} />
        </div>
      </div>
    </div>
  );
}

export default Login;
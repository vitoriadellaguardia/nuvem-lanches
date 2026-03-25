import { useEffect, useState } from "react";
import api from "../api/axios";
import "./ItensPage.css";

export default function ItensPage() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/itens");
        setItens(data);
      } catch (err) {
        setError(err.message || "Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItens();
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <span className="header-tag">REST</span>
          <h1 className="header-title">Itens</h1>
          <p className="header-sub">fetching from localhost:3000/itens</p>
        </div>
        <div className="header-line" />
      </header>

      <main className="main">
        {loading && (
          <div className="state-box loading-box">
            <div className="spinner" />
            <p>Loading itens…</p>
          </div>
        )}

        {error && (
          <div className="state-box error-box">
            <span className="error-icon">✕</span>
            <p className="error-title">Request Failed</p>
            <p className="error-msg">{error}</p>
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && itens.length === 0 && (
          <div className="state-box empty-box">
            <span className="empty-icon">∅</span>
            <p>No itens found.</p>
          </div>
        )}

        {!loading && !error && itens.length > 0 && (
          <>
            <p className="result-count">{itens.length} item(s) returned</p>
            <ul className="grid">
              {itens.map((item, idx) => (
                <li key={item.id ?? idx} className="card">
                  <div className="card-index">#{idx + 1}</div>
                  <div className="card-body">
                    {Object.entries(item).map(([key, val]) => (
                      <div key={key} className="card-row">
                        <span className="card-key">{key}</span>
                        <span className="card-val">
                          {typeof val === "object"
                            ? JSON.stringify(val)
                            : String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

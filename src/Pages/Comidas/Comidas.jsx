import React, { useState } from "react";
import { Link } from "react-router-dom";
//Buscador de pelis
export const Comidas = () => {
  const [query, setQuery] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const apiKey = "3b24534de9f3e0c2935e3edd6446ad0c"; // Reemplaza con tu clave API
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setPeliculas(data.results.slice(0, 5)); // Muestra solo las primeras 5 películas
    } catch (error) {
      console.error("Error buscando películas:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          padding: "20px",
          backgroundColor: "#669675",
          color: "white",
          textAlign: "center",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>
          🎬 Buscador de Películas
        </h1>
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Buscar una película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "10px",
              width: "60%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#ffffff",
              color: "#4CAF50",
              border: "none",
              borderRadius: "5px",
              fontFamily: "'Poppins', sans-serif"   ,
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}

          >
            🔍 Buscar
          </button>
        </form>
      </nav>

      {/* Resultados */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Resultados
        </h2>
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px",
          }}
        >
          {peliculas.map((pelicula) => (
            <div
              key={pelicula.id}
              className="movie"
              style={{
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = "scale(1.05)") &&
                (e.target.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.15)")
              }
              onMouseOut={(e) =>
                (e.target.style.transform = "scale(1)") &&
                (e.target.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)")
              }
            >
              <Link to={`/Pelicula?id=${pelicula.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${pelicula.poster_path}`}
                  alt={pelicula.title}
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
              </Link>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                {pelicula.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                Clasificación: {pelicula.vote_average}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

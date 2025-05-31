// src/pages/Perfil/Reviews.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cinePlusApi from '../../api/cinePlusApi'; // Asegúrate de tener el archivo cinePlusApi para la comunicación con el backend
import axios from 'axios'; // Asegúrate de importar axios aquí
import './Reviews.css'; // Importa el archivo CSS si lo tienes en otro archivo
import { Link } from 'react-router-dom';

export const Reviews = () => {
  const { email } = useSelector((state) => state.auth); // Obtener el email del usuario desde el estado global (Redux)
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieNames, setMovieNames] = useState({});
  // Función para obtener las reviews desde el backend
  const obtenerReviews = async () => {
    try {
      const response = await cinePlusApi.get(`/reviews/${email}`);
      setReviews(response.data); // Suponemos que la respuesta contiene las reviews
      setLoading(false);
      //console.log(response.data);
      const movieIds = response.data.map((review) => review.peliculaId); // Extraemos los IDs de las películas
      obtenerNombresPeliculas(movieIds);
    } catch (err) {
      setError("Error al cargar las reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      obtenerReviews(); // Solo carga las reviews si hay un email (usuario autenticado)
      
    }
  }, [email]);
  const obtenerNombresPeliculas = async (movieIds) => {
    try {
      const movieDetails = {};
      for (const movieId of movieIds) {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3b24534de9f3e0c2935e3edd6446ad0c`);
        console.log(response.data.title);
        movieDetails[movieId] = response.data.title; // Guardamos el nombre de la película

      }
      setMovieNames(movieDetails); // Actualizamos el estado con los nombres de las películas
    } catch (err) {
      console.error("Error al obtener los nombres de las películas", err);
    }
  };
  return (
    <div className="reviewsContainer">
      <h1>Mis Reviews</h1>
      {loading && <p>Cargando reviews...</p>}
      {error && <p className="error">{error}</p>}
      {reviews.length === 0 && !loading && <p>No tienes reviews aún.</p>}

      <div className="reviewsList">
        {reviews.map((review, index) => (
        <Link to={`/Pelicula?id=${review.peliculaId}`}>
          <div key={index} className="reviewCard">
            <h3>{movieNames[review.peliculaId] || "Cargando título..."}</h3> {/* Mostrar el nombre de la película */}
            <p>{review.contenido}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

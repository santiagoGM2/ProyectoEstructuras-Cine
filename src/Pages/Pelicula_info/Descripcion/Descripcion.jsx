import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Descripcion.css';

import MovieTrailer from './Trailer/Trailer.jsx';
import { useSelector } from 'react-redux';
import cinePlusApi from '../../../api/cinePlusApi.js';
const fecha = new Date();

const defPelicula = {
    overview: 'Descripción no disponible',
    original_title: 'Título no disponible',
    production_countries: [{ name: 'No disponible' }],
    release_date: 'Fecha no disponible',
    genres: [{ name: 'No disponible' }],
    spoken_languages: [{ english_name: 'No disponible' }],
    runtime: 'Duración no disponible',
    original_language: 'No disponible',
    adult: false,
    vote_average: 0
};

const defCredits = { crew: [{ job: 'Director', name: 'No disponible' }] };

const defVideos = {
    "results": [
        {
            "key": "dQw4w9WgXcQ",
        }
    ]
}


const Descripcion = ({ idPelicula, pelicula = defPelicula, credits = defCredits, videos = defVideos }) => {
    const ordendecrearenviada = useRef(false);
    const { status, email } = useSelector((state) => state.auth);
    //const { status, user } = useSelector(state => state.auth); // Asegúrate de tener el usuario y su estado
    const director = credits.crew ? credits.crew.find(crew => crew.job === 'Director') : { name: 'No disponible' };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ message: "" });
    const [newReview, setNewReview] = useState(""); // Texto de la nueva review
    const [reviews, setReviews] = useState([]); // Lista de reviews

    // Obtener las últimas 5 reviews
    const obtenerReviews = async () => {
        try {
            const response = await cinePlusApi.get(`/reviews/pelicula/${idPelicula}`);
            console.log(response);
            console.log(1);
            console.log(response.data); // Verifica la estructura de la respuesta
    
            setReviews(response.data.slice(-5)); // Asegúrate de que response.data sea un arreglo
    
            setLoading(false);
        } catch (err) {
            setError({ message: "Error al cargar las reviews" });
            setLoading(false);
        }
    };
    
    useEffect(() => {
        console.log("Reviews actualizadas:", reviews); // Esto se ejecutará cada vez que reviews cambie
    }, [reviews]);  // Este useEffect depende de `reviews`, por lo que se ejecuta cuando cambia
    

    // Publicar una nueva review
    const publicarReview = async () => {
        if (!status) {
            setError({ message: "Debes iniciar sesión para publicar una review." });
            return;
        }

        try {
            console.log(email);
            console.log(newReview);
            console.log(idPelicula);
            const response = await cinePlusApi.post("/reviews/crearReview", {
                peliculaId: idPelicula,
                usuarioEmail: email, 
                contenido: newReview,
            });
            setReviews(prev => [...prev.slice(-4), response.data]); // Mantener solo las últimas 5 reviews
            setNewReview(""); // Limpiar el campo de texto
        } catch (err) {
            setError({ message: "Error al publicar la review" });
        }
    };

    useEffect(() => {
        obtenerReviews(); // Cargar las reviews al montar el componente
        console.log(reviews); 
    }, [idPelicula]);

    return (
        <div className='MayorContainer'>
            <div className='InfoContainer'>
                <div className='DescriptionContainer'>
                    <p>{pelicula.overview || 'Descripción no disponible'}</p>
                    <h6>Título original: {pelicula.original_title || 'Título no disponible'}</h6>
                    <h6>País de origen: {pelicula.production_countries && pelicula.production_countries[0] ? pelicula.production_countries[0].name : 'No disponible'}</h6>
                    <h6>Director: {director ? director.name : 'No disponible'}</h6>
                    <h6>Fecha de estreno: {pelicula.release_date || 'Fecha no disponible'}</h6>
                    <h6>Géneros: {pelicula.genres && pelicula.genres.length > 0 ? pelicula.genres.map(genre => genre.name).join(', ') : 'No disponible'}</h6>
                    <h6>Idiomas: {pelicula.spoken_languages && pelicula.spoken_languages.length > 0 ? pelicula.spoken_languages.map(lang => lang.english_name).join(', ') : 'No disponible'}</h6>
                    <h6>Duración: {pelicula.runtime ? `${pelicula.runtime} minutos` : 'Duración no disponible'}</h6>
                    <h6>Idioma original: {pelicula.original_language || 'No disponible'}</h6>
                    <h4>Para todo público: {pelicula.adult ? 'No' : 'Sí'}</h4>
                    <h3>Rating: {pelicula.vote_average !== undefined ? pelicula.vote_average.toFixed(1) : '0.0'}/10</h3>
                </div>
                <div className='CalendarioContainer'>
    {videos && videos.results.length > 0 && <MovieTrailer videoKey={videos.results[0].key} />}
    
    {/* Sección de reviews */}
    <h1>Opiniones</h1>
    {error.message && <p className="error">{error.message}</p>} {/* Mostrar errores */}

    <div className="reviewsSection">
    {loading ? (
        <p>Cargando reviews...</p>
    ) : (
        <div className="reviewsGrid">
            {reviews.map((review, index) => (
                <div key={index} className="reviewCard">
                    <p><strong>{"'"}{review.contenido}{"'"}</strong></p>
                    
                    <p>{"-"}{review.usuarioEmail.split('@')[0]}</p>
                </div>
            ))}
        </div>
    )}
</div>


    {/* Nueva sección para el search box y el botón */}
    <div className="searchBoxContainer">
        {/* Campo para dejar una review */}
        {status ? (
            <div className="newReview">
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Escribe tu opinión..."
                />
                <button onClick={publicarReview}>Publicar Review</button>
            </div>
        ) : (
            <p>Para publicar una review, <Link to="/login">inicia sesión</Link></p>
        )}
    </div>
</div>

                
            </div>
        </div>
    );
}

export default Descripcion;

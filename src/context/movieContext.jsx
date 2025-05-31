// src/context/MovieContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(null);
  const [entryTime, setEntryTime] = useState(null); // Nuevo estado para la hora de ingreso

  return (
    <MovieContext.Provider value={{ movieId, setMovieId, entryTime, setEntryTime }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);

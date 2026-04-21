import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./favorites.css";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let myMovies = localStorage.getItem("@cineMedia");
    setMovies(JSON.parse(myMovies) || []);
  }, []);

  function handleDeleteButton(id) {
    const filterMovie = movies.filter((movie) => {
      return movie.id !== id;
    });
    setMovies(filterMovie);
    localStorage.setItem("@cineMedia", JSON.stringify(filterMovie));
  }

  return (
    <div className="favorites">
      <h1>Meus filmes</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <strong>{movie.title}</strong>
              <div>
                <Link to={`/movie/${movie.id}`}>Detalhes do filme</Link>
                <button onClick={() => handleDeleteButton(movie.id)}>
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorites;

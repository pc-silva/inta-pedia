import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "486cf28af09bfe05eae35b3756702a16",
          language: "pt-BR",
          page: 1,
        },
      });
      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadMovie();
  }, []);

  return (
    <div className="container">
      <h1>Top 10 filmes no cinema</h1>
      <div className="list-movies">
        {loading ? (
          <h2>Carregando lista de filmes...</h2>
        ) : (
          movies.map((movie) => {
            return (
              <article key={movie.id}>
                <strong>{movie.title}</strong>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
                <Link to={`/movie/${movie.id}`}>Acessar</Link>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
export default Home;

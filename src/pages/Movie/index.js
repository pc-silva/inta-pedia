import { useEffect, useState } from "react";
import { useParams, useNavigate, replace } from "react-router-dom";
import api from "../../services/api";

import "./movie.css";

function Movie() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "486cf28af09bfe05eae35b3756702a16",
            language: "pt-BR",
          },
        })
        .then((response) => setMovie(response.data))
        .catch(() => {
          navigation("/", { replace: true });
          return;
        });
    }
    loadMovie();
  }, [navigation, id]);

  function saveMovie() {
    const listMovies = localStorage.getItem("@cineMedia");
    let savedMovies = JSON.parse(listMovies) || [];
    const hasMovies = savedMovies.some(
      (haveSaved) => haveSaved.id === movie.id,
    );
    if (hasMovies) {
      alert("Este filme já contém na sua lista!");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@cineMedia", JSON.stringify(savedMovies));
    alert("Filme adicionado com sucesso!");
  }

  return (
    <div className="list-info">
      {loading ? (
        <h2>Carregando lista de filmes...</h2>
      ) : (
        <>
          <div className="left">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          </div>
          <div className="right">
            <h1>{movie.title}</h1>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>
              <span className="rated">{movie.vote_average}</span> / 10
            </strong>
            <div className="area-buttons">
              <button onClick={saveMovie}>Salvar</button>
              <button>
                <a
                  target="_blank"
                  rel="external"
                  href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
                >
                  Trailer
                </a>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Movie;

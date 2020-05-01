import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, deleteMovies }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    history.push(`/update-movie/${match.params.id}`);
  }

  const deleteMovie = () => {
    const id = match.params.id;
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(() => {
      deleteMovies();
      history.push(`/`);
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

       <button onClick={editMovie}>Edit Movie</button>
       <button onclick={saveMovie}> Save Changes</button>
       <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;

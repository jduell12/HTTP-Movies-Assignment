import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import {BASE_URL} from '../utils/constants'

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    //deletes item from api using axios call
    axios
      .delete(`${BASE_URL}api/movies/${params.id}`)
      .then(res => {
        const newMoviesArr = props.movieList.filter(movie => movie.id !== params.id);
        props.setMovieList(newMoviesArr);
        push('/');
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={e => props.history.push(`/update-movie/${movie.id}`, movie)}>
        Edit Movie
      </button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;

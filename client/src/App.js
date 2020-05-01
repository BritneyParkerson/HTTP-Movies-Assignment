import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import EditMovie from './Movies/EditMovie';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [ movieAmount, setMovieAmount ] = useState(0);
  const [ editAmount, setEditAmount ] = useState(0);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
        setMovieAmount(res.data.length);
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovies = () => {
    setMovieAmount(movieAmount - 1);
  }
  const handleEditCount = () => {
    setEditAmount(editAmount + 1);
  }

  useEffect(() => {
    getMovieList();
  }, [movieAmount, editAmount]);
 

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovies={deleteMovies}/>
      </Route>

      <Route path='/update-movie/:id'>
        <EditMovie handleEditAmount={handleEditCount}/>
      </Route>
    </>
  );
};

export default App;

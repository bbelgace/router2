import { useEffect, useState } from "react";
import { moviesData } from "./components/MoviesData";
import AddMovie from "./components/AddMovie/AddMovie";
import MovieList from "./components/MoviesList";
import SearchMovie from "./components/SearchMovie/SearchMovie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
function App() {
  const [moviesList, setMoviesList] = useState(moviesData);
  const [nameSearch, setNameSearch] = useState("");
  const [ratingSearch, setRatingSearch] = useState(null);

  const filterByName = () => {
    setMoviesList(
      moviesData.filter((el) =>
        el.name.toLowerCase().startsWith(nameSearch.toLowerCase().trim())
      )
    );
  };

  const filterByRating = () => {
    ratingSearch &&
      setMoviesList(moviesData.filter((el) => el.rating === ratingSearch));
  };

  const addNewMovie = (newMovie) => {
    moviesData.push(newMovie);
    console.log(moviesData);
    setMoviesList([...moviesList, newMovie]);
  };

  useEffect(() => {
    filterByName();
  }, [nameSearch]);

  useEffect(() => {
    filterByRating();
  }, [ratingSearch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies">
            <SearchMovie
              setNameSearch={setNameSearch}
              ratingSearch={ratingSearch}
              setRatingSearch={setRatingSearch}
            />
            <MovieList moviesList={moviesList} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AddMovie addNewMovie={addNewMovie} />
            </div>
          </Route>
          <Route
            path="/movies/:id"
            render={(props) => {
              //console.log(props);
              return <MovieDetails {...props} movies={moviesList} />;
            }}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

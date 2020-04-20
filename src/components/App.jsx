import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import * as api from "./api";

class App extends React.Component {
  state = {
    movies: [],
    moviesWillWatch: [],
    sort_by: "popularity.desc",
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${api.API_URL}/discover/movie?api_key=${api.API_KEY_3}&sort_by=${this.state.sort_by}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ movies: data.results });
      });
  };

  handleDeleteMovie = (id) => {
    const newMovies = this.state.movies.filter((item) => item.id !== id);
    this.setState({ movies: newMovies });
  };

  addMovieToWillWatch = (movie) => {
    const newMoviesWillWatch = [...this.state.moviesWillWatch, movie];
    this.setState({ moviesWillWatch: newMoviesWillWatch });
  };

  removeMovieFromWillWatch = (movie) => {
    const newMoviesWillWatch = this.state.moviesWillWatch.filter(
      (item) => item.id !== movie.id
    );
    this.setState({ moviesWillWatch: newMoviesWillWatch });
  };

  updateSortBy = (value) => {
    this.setState({ sort_by: value });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      handleDeleteMovie={this.handleDeleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <p>Will watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

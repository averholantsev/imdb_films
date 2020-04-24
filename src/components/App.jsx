import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";
import * as constants from "./api";

class App extends React.Component {
  state = {
    movies: [],
    moviesWillWatch: [],
    sort_by: "popularity.desc",
    currentPage: 1,
    total_pages: null,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by || prevState.currentPage !== this.state.currentPage) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${constants.API_URL}/discover/movie?api_key=${constants.API_KEY_3}&page=${this.state.currentPage}&sort_by=${this.state.sort_by}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ movies: data.results, total_pages: data.total_pages });
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
    this.setState({ sort_by: value, currentPage: 1 });
  };

  updateCurrentPage = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  onNextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  
  onPrevPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
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
            <div className="row mb-4">
              <div className="col-12">
                <Pagination
                  totalPages={this.state.total_pages}
                  currentPage={this.state.currentPage}
                  updateCurrentPage={this.updateCurrentPage}
                  onNextPage={this.onNextPage}
                  onPrevPage={this.onPrevPage}
                />
              </div>
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

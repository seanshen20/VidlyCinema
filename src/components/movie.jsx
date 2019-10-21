import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

import _ from "lodash";

export default class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    size: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  handleDelete = id => {
    const movies = this.state.movies.filter(m => m._id !== id);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePage = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "-1" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  getPageData = () => {
    const {
      size,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id !== "-1"
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, size);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const numberOfMovies = getMovies().length;
    const { size, currentPage, sortColumn } = this.state;
    if (numberOfMovies === 0) return <h2>The Movie is empty</h2>;

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {totalCount} Movies in Database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={size}
            currentPage={currentPage}
            onClick={this.handlePage}
          />
        </div>
      </div>
    );
  }
}

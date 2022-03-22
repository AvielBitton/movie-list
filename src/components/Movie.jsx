import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";

class Movie extends Component {
  state = {
    countList: getMovies().length,
    movie: getMovies(),
  };
  render() {
    console.log(this.state.movie);
    return (
      <div className="container m-4">
        {this.state.movie.length === 0 && (
          <p>There are no movies in the database</p>
        )}
        {this.state.movie.length !== 0 && (
          <p>There are {this.state.movie.length} movies in the database</p>
        )}

        <table className="table">
          {this.state.movie.length !== 0 && (
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
              </tr>
            </thead>
          )}
          <tbody>{this.getData()}</tbody>
        </table>
      </div>
    );
  }
  getData = () => {
    const allObjectArr = [];
    for (let i = 0; i < this.state.movie.length; i++) {
      const ObjectMovie = this.state.movie[i];
      let title = ObjectMovie.title;
      let genre = ObjectMovie.genre.name;
      let stock = ObjectMovie.numberInStock;
      let rate = ObjectMovie.dailyRentalRate;
      let button = (
        <button
          type="button"
          onClick={() => this.deleteRow(ObjectMovie)}
          className="btn btn-danger btn-sm"
          key={i}
        >
          Delete
        </button>
      );

      const ObjectMovieArr = [title, genre, stock, rate, button];
      allObjectArr.push(ObjectMovieArr);
    }
    const mapAllObjectArr = allObjectArr.map((item) => (
      <tr key={item} id={item.title} scope="row">
        {item.map((title) => (
          <td key={title}>{title}</td>
        ))}
      </tr>
    ));
    return mapAllObjectArr;
  };

  deleteRow = (ObjectMovie) => {
    this.state.movie = this.state.movie.filter(
      (object) => object !== ObjectMovie
    );
    this.setState(this.state.movie);
  };
}

export default Movie;

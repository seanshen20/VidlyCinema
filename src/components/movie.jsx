import React, { Component } from 'react'
import {getMovies} from '../services/fakeMovieService'
import Like from './common/like';

export default class Movie extends Component {
    state = {
        movies: getMovies()
    }
    handleDelete = (id) => {
        const movies = this.state.movies.filter(m => m._id !== id)
        this.setState({movies})
    }
    handleLike = (movie) => {
        const movies = [... this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = {... movies[index]}
        movies[index].liked = !movies[index].liked;
        this.setState({movies})
    }
    render() {
        const len = this.state.movies.length; 
        if (len === 0) return <h2>The Movie is empty</h2>
        return (
            <>
                <p>There are {len} Movies.</p>
               <table className="table">
                   <thead>
                       <tr>
                           <th>Title</th>
                           <th>Genre</th>
                           <th>Stock</th>
                           <th>Rate</th>
                           <th></th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody> 
                        {this.state.movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><button 
                                className="btn btn-danger btn-sm"
                                onClick={()=> this.handleDelete(movie._id)}>Delete</button></td>
                            <td>
                                <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                            </td>
                        </tr>
                        ))}
                       
                   </tbody>
               </table> 
            </>
        )
    }
}

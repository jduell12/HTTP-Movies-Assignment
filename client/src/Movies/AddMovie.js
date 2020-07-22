import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../utils/constants'

const AddMovie = props => {
    const newMovie = {
        title: '',
        director: '',
        metascore: '', 
        stars: []
    }

    const [movie, setMovie] = useState(newMovie);
    const {push} = useHistory();

    const handleChange = event => {
        let value = event.target.name==='stars' ? event.target.value.split(',') : event.target.value;

        setMovie({
            ...movie,
            [event.target.name]: value
        });
    }

    const submitMovie = event => {
        event.preventDefault();
        //make a post request to add movie to api
        axios 
            .post(`${BASE_URL}api/movies`, movie)
            .then(res => {
                props.setMovieList(res.data);
                push('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={submitMovie}>
            <label htmlFor="title">
                Title: &nbsp;
                <input type="text" id ="title" name="title" value={movie.title}  onChange={handleChange} />
            </label>
            <label htmlFor="director">
                Director: &nbsp;
                <input type="text" id="director" name="director" value={movie.director} onChange={handleChange}  />
            </label>
            <label htmlFor="metascore">
                Metascore: &nbsp;
                <input type="number" id="metascore" name="metascore" value={movie.metascore} onChange={handleChange} step="1" />
            </label>
            <label htmlFor="stars">
                Stars: &nbsp;
                <input type="text" id="stars" name="stars" value={movie.stars.join(',')} onChange={handleChange} />
            </label>
            <button>Add Movie</button>
        </form>
    )
}

export default AddMovie;
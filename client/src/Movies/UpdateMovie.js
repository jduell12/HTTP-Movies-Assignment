import React, {useState, useEffect} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';

const initialMovie = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const UpdateMovie = props => {

    const [movie, setMovie] = useState(initialMovie);
    const location = useLocation();
    const params = useParams();
    const {push} = useHistory();



    useEffect(() => {
        //check if we have data in location.data for the movie
        //if we don't then make api call to retrieve the movie details
        if(location.state){
            setMovie(location.state);
        } else {    
            axios.get(`${BASE_URL}api/movies/${params.id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.log(err))
            
        }
    }, [location.state, params.id])

    const submitMovie = e => {
        e.preventDefault();
        
        axios 
            .put(`${BASE_URL}api/movies/${params.id}`, movie)
            .then(res => {
                const newMovieArr = props.movieList.filter(movie => movie.id !== params.id);
                newMovieArr.push(res.data);
                props.setMovieList(newMovieArr);
                push(`/`);
            })
            .catch(err => console.log(err))
    }

    const handleChange = event => {
        let value = event.target.name==='stars' ? event.target.value.split(',') : event.target.value;

        setMovie({
            ...movie,
            [event.target.name]: value
        });
    }

    return(
        <form className="updateForm" onSubmit={submitMovie}>
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
            <button>Edit Movie</button>
        </form>
    )
}

export default UpdateMovie;
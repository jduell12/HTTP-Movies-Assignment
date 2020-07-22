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

    //check if we have data in location.data for the movie
    //if we don't then make api call to retrieve the movie details

    useEffect(() => {
        if(location.state){
            setMovie(location.state);
        } else {    
            console.log('in else');
            axios.get(`${BASE_URL}api/movies/${params.id}`)
            .then(res => {
                const newMovieArr = props.movieList.fileter(movie => movie.id !== params.id);
                newMovieArr.push(res.data);
                props.setMovieList(newMovieArr);
                push(`/movies/${params.id}`);
            })
            .catch(err => console.log(err))
            
        }
    }, [location.state, params.id])

    const submitMovie = e => {
        e.preventDefault();
        
        axios 
            .put(`${BASE_URL}api/movies/${params.id}`, movie)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
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
            <button>Edit Movie</button>
        </form>
    )
}

export default UpdateMovie;
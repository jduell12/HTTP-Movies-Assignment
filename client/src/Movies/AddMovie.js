import React, {useState} from 'react';

const AddMovie = () => {
    const newMovie = {
        title: '',
        director: '',
        metascore: ''
    }

    const [movie, setMovie] = useState(newMovie)

    const handleChange = event => {

    }

    const submitMovie = event => {

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
            <button>Edit Movie</button>
        </form>
    )
}

export default AddMovie;
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg' 
import MovieCard from './MovieCard'

// 27fd98dd
const API_URL ="https://www.omdbapi.com?apikey=27fd98dd"

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search)
  }
  useEffect( () => {
    searchMovies(searchTerm);
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1> 
      <div className='search'>
        <input 
          placeholder='search for movies'
          value={searchTerm}
          onChange={ (e) => {setSearchTerm(e.target.value)}}
        />
        <img
          src= {SearchIcon}
          alt= 'search img'
          onClick={() => {searchMovies(searchTerm)}}
        />
      </div>

      {movies?.length > 0 ?
        (
          <div className='container'>
            {movies.map( (movie) => <MovieCard movie={movie}/>)}
          </div>
        ) : (
          <div>
            <h2>No movie found</h2>
          </div>
        )}

     
    </div>
  );
}

export default App;

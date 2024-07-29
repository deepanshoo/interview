import { useState } from 'react'
import './App.css'

function App() {
   const [movies,setMovies]=useState([])
   const [query,setQuery]=useState("")
   const [movie,setMovie]=useState(null)
   const handleSearch=async(e)=>{
    e.preventDefault()
    const url=`http://www.omdbapi.com/?apikey=8fc6c84a&s=${query}`
    try{
      const res= await fetch(url);
      const data= await res.json();
      setMovies(data.Search);
    }
    catch(err){
      console.log(err);
    }
   }
   const fetchDetails=async(imdbID)=>{
    const url=`http://www.omdbapi.com/?apikey=8fc6c84a&i=${imdbID}`
    try{
      const res= await fetch(url);
      const data= await res.json();
      setMovie(data.Search)
      setMovies([]);
    }
    catch(err){
      console.log(err);
    }
   }
  return (
    <>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Movie Name</label>
        <input type="text" name="query" placeholder="Ex. Blade Runner" value={query} onChange={(e)=>setQuery(e.target.value)}/>
        <button type="submit">Search</button>
      </form>
      <div className="movies">
        {movies && movies.map((movie)=>{
          return (
            <div key={movie.imdbID} className="movie">
              <h4>{movie.Title}</h4>
              <button onClick={()=>fetchDetails(movie.imdbID)}>
              <img src={movie.Poster} alt={`${movie.Title}`}/>
              </button>
              <p>{movie.Genre}</p>
              <p>{movie.Year}</p>
            </div>
          )
        })}
      </div>
      {movie && (
        <div className="details">
          <h2>{movie.Plot}</h2>
        </div>
      )}
    </>
  )
}

export default App

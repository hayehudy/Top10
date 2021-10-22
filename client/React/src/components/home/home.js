import './home.css';
import Addbar from "../addbar/addbar"
import Searchbar from "../searchbar/searchbar";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Home() {
const [name,setName]=useState();
const [search,setSearch]=useState();
const [movies,setMovies]=useState([]);
const [names,setNames]=useState([]);
const [show, setShow] = useState(false);
let server=process.env.REACT_APP_SERVER_ADDRESS;
 

useEffect(()=>{
// for server of dotnet:
// axios.get(server+'/Movies/Search?search='+search)

axios.get(`/Movies/Search?search = ${search}`)
// axios.get(`http://localhost:8000/Movies/Search?search = ${search}`)
// axios.get("http://localhost:8000/Movies/Search", { params: { search: search } }) // another way to same action
.then (res=>{
setMovies(res.data);
if (names.length<1){
  let theNames=[];
  res.data.forEach((m)=>theNames.push(m.name));
  setNames(theNames)}})
},[search])

const showDetails=(movie)=>{
if (!name) {setName(movie.name); setShow(true)}
else if (name!==movie.name && show===false) {setName(movie.name);setShow(true)}
else if (name!==movie.name && show===true) {setName(movie.name)}
else {setShow(!show)}}


  return (
    <div className="Home">
      <header className="Home-header">
        <span><h1>TOP 10 MOVIES</h1></span>
        <img src="imgmovie.svg" className="App-logo" alt="logo" />
      </header>
      <div className="moviesbar">
        {search&&
        <div><h3> {search} movies ({movies.length} movies)</h3></div>}    
        {movies.map((movie)=>
          <div key={movie.name}>
          <div style={{color:"white"}}>{movie.name}</div>
          <img className="image" src={movie.imgurl} onClick={()=>showDetails(movie)}/>
       
          {name===movie.name&&show&&<div>
            <div>the Category: {movie.category}</div>
            <div>the Grade: {movie.grade}</div>
            </div>}
          <div style={{height:"30px"}}></div>          
          </div>        
        )}
      </div>
      <div className="addbar" >
        <div className="addbar2">
        <Addbar movies={movies}  setMovies={setMovies} names={names} setNames={setNames}/>
        </div>      
        </div>      
      <div className="searchbar"><Searchbar  setSearch={setSearch}/></div> 
     
    </div>
    
  );
}

export default Home;


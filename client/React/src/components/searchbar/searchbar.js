import "./searchbar.css"
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";

function Bar({setSearch}){

    const onclick=(e)=>{setSearch(e.target.text)}
    const [clicked,setClicked]=useState(false);
    let categories = ["Action", "Science Fiction", "Suspense", "Comedy", "Drama"]

return(
    <div className="divdropdown">
        
        <DropdownButton id="dropdown-basic-button" title="Select a category" onClick={()=>setClicked(!clicked)}>
            <Dropdown.Item onClick={()=>setSearch()} href="#/action-1">All movies</Dropdown.Item>
            {categories.map((category)=>
            <Dropdown.Item key={category} onClick={onclick}>{category}</Dropdown.Item>)}
        </DropdownButton>

        {!clicked &&
            <div className="app-logo-div">
                <img src="imgmovie.svg" className="App-logo-add-bar" alt="logo" />
            </div>}

    </div>
)
}

export default Bar;

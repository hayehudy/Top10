import "./addbar.css"
import { Form, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import React, { useState, useRef} from "react";
import axios from "axios";
import ReactPlayer from 'react-player';

function Bar({movies, setMovies , names,setNames}){
    const [showAdd,setShowAdd] = useState(false)
    const [showUpdate,setShowUpdate] = useState(false)
    const [Name,setName] = useState();
    const [Category,setCategory] = useState();
    const [Grade,setGrade] = useState(0);
    const [ImageUrl,setImageUrl] = useState();
    const [lack,setLack] = useState(false);
    const [update,setUpdate] = useState({})
    const [err,setErr] = useState();    
    const [success,setSuccess] = useState();
    let server = process.env.REACT_APP_SERVER_ADDRESS;
    let categories = ["Action", "Science Fiction", "Suspense", "Comedy", "Drama"]

    const onclick=(e)=>{setCategory(e.target.text)};
    
    const toFill=(name)=>{
      setCategory();
      let theMovie=movies.find((m)=>m.name===name);
      setUpdate(theMovie)
    }

    function sendAdd(){
        let id=0;
        movies.forEach((e)=>{if(e.id>id){id=e.id}});

        if (Name && Category && Grade && ImageUrl){
          let obj={
            id:id+1,
            name:Name,
            category: Category,
            grade:Grade,
            imgurl: ImageUrl
          }
          // axios.post(server+"/Movies",obj)
          axios.post("http://localhost:8000/Movies/Add",obj)
          .then(res=>{
            setMovies(res.data);
            let theNames=[];
            res.data.forEach((m)=>theNames.push(m.name));  
            setNames(theNames);
            setErr();
            setSuccess("The movie was successfully added!");
          })
          .catch(err => {setErr(err.response.data)});
            setLack(false);
          }
        else {setLack(true)}
    }

    function sendUpdate(){
        let obj={
          id: update.id,
          // _id:update._id,
          name: update.name,
          category: Category? Category:update.category,
          grade: Grade? Grade:update.grade,
          imgurl: ImageUrl? ImageUrl:update.imgurl
        }
        // axios.put(server+"/Movies",obj)
        axios.put("http://localhost:8000/Movies/Update",obj)
        .then(res=>{    
          setMovies(res.data);
          let theNames = [];
          res.data.forEach((m)=>theNames.push(m.name));  
          setNames(theNames);
          setSuccess("The movie has been successfully updated!")
        })
  }

return(
    <div className="container">
      <iframe src="https://www.youtube.com/embed?v=cxEa5ChEK9E&list=RDcxEa5ChEK9E&start_radio=1"></iframe> 
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=ezs5QvWBtf4" controls={true}/> */}

      {!showAdd && !showUpdate &&
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button variant="secondary" onClick={()=>setShowAdd(true)}>Add movie</Button>
          <Button variant="secondary" onClick={()=>setShowUpdate(true)}>Update movie</Button>
        </div>}

      {showAdd &&
       <Form>
          <h5>Add new movie</h5>

          <Form.Group>
            <Form.Control className="input" placeholder="Name"  onChange={(e)=>{setName(e.target.value);setErr()}}/>
          </Form.Group>

          <div style={{marginBottom: "15px",width:"100%"}}>
            <DropdownButton className="dropdown-basic-button add-buttun" title={!Category? "Category":Category}>
              {categories.map((category)=>
              <Dropdown.Item key={category} onClick={onclick}>{category}</Dropdown.Item>)}
            </DropdownButton>
          </div>

          <Form.Group>
            <Form.Control onChange={(e)=>setGrade(e.target.value)} className="input" placeholder="Grade" />
          </Form.Group>

          <Form.Group>
            <Form.Control onChange={(e)=>setImageUrl(e.target.value)} className="input" placeholder="Image Url" />
          </Form.Group>
      
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <Button onClick={sendAdd}> Add </Button>
          <Button onClick={()=>{setShowAdd(false);setErr();setSuccess()}}> Close </Button>
          </div>

          {lack&&<div style={{color:"red"}}>Fill in all the details</div>}
          {err&&<div style={{color:"red"}}>{err}</div>}
          {success&&<div style={{backgroundColor:"white",color:"green"}}>{success}</div>}

        </Form>}

      {showUpdate&&
        <Form>
          <h5>Update movie</h5>
          <div>Select a movie by name</div>
          <div style={{marginBottom: "15px",width:"100%"}}>
            <DropdownButton className="dropdown-basic-button" title={!update.name? "Name":update.name}>
              {names.map((name)=>
              <Dropdown.Item key={name} onClick={(e)=>toFill(e.target.text)}>{name}</Dropdown.Item>)}            
            </DropdownButton>
          </div>
          
          <div style={{marginBottom: "15px",width:"100%"}}>
            <DropdownButton className="dropdown-basic-button" style={{width:"100% !important"}} title={!update.category?"Category":(!Category?update.category:Category)}>
              {categories.map((category)=>
              <Dropdown.Item key={category} onClick={onclick}>{category}</Dropdown.Item>)}           
            </DropdownButton> 
          </div>

          <Form.Group>
            <Form.Control onChange={(e)=>setGrade(e.target.value)} className="input" placeholder={!update.grade?"Grade":update.grade} />
          </Form.Group>

          <Form.Group>
            <Form.Control onChange={(e)=>setImageUrl(e.target.value)} className="input" placeholder={!update.imgurl?"Image Url":update.imgurl} />
          </Form.Group>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <Button onClick={sendUpdate}>
            Update
          </Button>

          <Button onClick={()=>{setShowUpdate(false);setUpdate({});setCategory();setGrade();setImageUrl();setSuccess()}}>
            Close
          </Button>
          </div>

        </Form>}

      {!showAdd&&!showUpdate&&
        <div className="app-logo-div">
        <img src="imgmovie.svg" className="App-logo-add-bar" alt="logo" />
        </div>}
    
    </div>
)


}

export default Bar;
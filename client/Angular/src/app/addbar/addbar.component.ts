import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-addbar',
  templateUrl: './addbar.component.html',
  styleUrls: ['./addbar.component.css']
})
export class AddbarComponent implements OnInit {

  addMovie: boolean= false;
  updateMovie: boolean= false;
  categories: string[] = ["Action", "Science Fiction", "Suspense", "Comedy", "Drama"];
  warn: string= "";
  newMovie: Movie={
    name: "",
    category: "",
    grade: 0,
    imgurl: "",
  };
  clicked: boolean= false;

  constructor() { }

  ngOnInit(): void {
  }

  @Input () names: string[] = [];
  @Input () movies: Movie[] = [];
  @Output() movieToAdd = new EventEmitter<Movie>();
  @Output() movieToUpdate = new EventEmitter<Movie>();

  setMovie(value: Movie){
      let check= Object.values(this.newMovie).some(x => x === null || x === '');
      if (check) {
        this.warn="Fill in all the details"
      }
      else if (this.newMovie.grade<1 || this.newMovie.grade>10){
        this.warn="Fill a grade between 1 and 10"}
      else
      {this.movieToAdd.emit(value);
        this.close("add");
      }
      
  } 
  
  setToUpdate(value: Movie){
      this.movieToUpdate.emit(value);
      this.close("update");
} 

  fill(name: string)
  {let index = this.movies.findIndex((x)=>x.name===name);
    this.newMovie=this.movies[index]
  }

  close(action: string){
    action==="add"?this.addMovie=false:this.updateMovie=false;
    this.warn='';
    this.newMovie={
      name: "",
      category: "",
      grade: 0,
      imgurl: "",
    };
    this.clicked=false
  }
  
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  error = '';
  server=environment.server;
  name:string = "";
  movies:Movie[] = [];
  names:string[] = [];
  show:boolean = false;
  selectedCatgory: string="";

  constructor(private MovieService:MovieService) { }

  ngOnInit(): void {
    this.getMovies("")
  }
 
  getMovies(search:string): void {
    this.selectedCatgory=search;
    this.MovieService
    .getAll(search)
    .subscribe(
      (data: Movie[]) => {
        this.movies = data; 
        if(this.names.length<1)       
        {this.fillNames()};
      },
      (err) => {
        console.log(err)
        this.error = err.message;
      }
    );
  }

  addmovie(movie:Movie){
    console.log(movie)
    this.MovieService
    .add(movie)
    .subscribe(
      (data: Movie[]) => {
        this.movies = data;
        this.fillNames();
        console.log(data)
      },
      (err) => {
        console.log(err)
        this.error = err.message;
      }
    );
  }

  updatemovie(movie:Movie){
    console.log(movie)
    this.MovieService
    .update(movie)
    .subscribe(
      (data: Movie[]) => {
        this.movies = data;
        this.fillNames();
        console.log(data)
      },
      (err) => {
        console.log(err)
        this.error = err.message;
      }
    );
  }
  
    
  showDetails (movieName:string) :void{
    if (!movieName) {this.name=movieName; this.show=true;}
    else if (this.name!==movieName && this.show===false) {this.name=movieName;this.show=true}
    else if (this.name!==movieName && this.show===true) {this.name=movieName}
    else {this.show=!this.show}}

  fillNames(): void{
    this.names=[];
      this.movies.forEach((e)=>{
        this.names.push(e.name)
      })
    }
}
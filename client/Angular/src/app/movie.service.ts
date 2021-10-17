import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = "http://localhost:8000/Movies/angular";

  constructor(private http : HttpClient) {}
  
   getAll(search:string) {
    return this.http.get(`${this.baseUrl}/Search?search=${search}`).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  
  add(movie: Movie) {
    return this.http.post(`${this.baseUrl}/Add`, { data: movie }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(movie: Movie) {
    return this.http.put(`${this.baseUrl}/Update`, { data: movie }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  @Output() search = new EventEmitter<string>();

  setSearch(value: string){
      this.search.emit(value);
  } 
  
  selected: string="";
  clicked:boolean = false;
  categories: string[] = ["Action", "Science Fiction", "Suspense", "Comedy", "Drama"]

}

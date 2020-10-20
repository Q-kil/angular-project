import { Component } from '@angular/core';


interface Book {  name: string;  author: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';
  books: Book[];  selectedBook: string;

  constructor() {
       this.books = [
         {name: 'Book1', author: 'Author1'},
         {name: 'Book2', author: 'Author2'},
         {name: 'Book3', author: 'Author3'}];   }
}

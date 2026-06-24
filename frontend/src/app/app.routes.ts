import { Routes } from '@angular/router';
import { BooksListComponent } from './books-list.component';
import { BookEditComponent } from './book-edit.component';

export const routes: Routes = [
	{ path: '', component: BooksListComponent },
	{ path: 'books', component: BooksListComponent },
	{ path: 'books/edit/:id', component: BookEditComponent }
];

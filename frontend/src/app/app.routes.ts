import { Routes } from '@angular/router';
import { BooksListComponent } from './books-list.component';

export const routes: Routes = [
	{ path: '', component: BooksListComponent },
	{ path: 'books', component: BooksListComponent },
	// future routes: { path: 'books/edit/:id', component: BookEditComponent }
];

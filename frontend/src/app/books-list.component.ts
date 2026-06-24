import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
  publishYear?: number;
  isbn?: string;
}

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="books-container">
      <h2>Books</h2>
      <table class="books-grid" *ngIf="books">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of books">
            <td>{{book.id}}</td>
            <td>{{book.title}}</td>
            <td>{{book.author}}</td>
            <td>{{book.publishYear}}</td>
            <td>{{book.isbn}}</td>
            <td>
              <button class="edit-btn" (click)="edit(book.id)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="books && books.length === 0">No books found.</p>
      <p *ngIf="!books">Loading…</p>
    </div>
  `,
  styles: [
    `
    .books-container { padding: 1rem; max-width: 900px; margin: 0 auto; }
    table.books-grid { width: 100%; border-collapse: collapse; }
    table.books-grid th, table.books-grid td { border: 1px solid #e0e0e0; padding: 0.5rem; text-align: left; }
    table.books-grid thead { background: #f8f8f8; }
    .edit-btn { padding: 0.35rem 0.6rem; cursor: pointer; }
    `
  ]
})
export class BooksListComponent implements OnInit {
  books: Book[] | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<Book[]>('/api/books').subscribe({
      next: (data) => (this.books = data),
      error: () => (this.books = [])
    });
  }

  edit(id?: number) {
    if (!id) return;
    this.router.navigate(['/books', 'edit', id]);
  }
}

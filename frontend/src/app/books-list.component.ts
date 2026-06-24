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
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="m-0">Books</h2>
        <a class="btn btn-outline-primary" routerLink="/books">Refresh</a>
      </div>

      <div *ngIf="books">
        <table class="table table-striped table-hover">
          <thead class="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Year</th>
              <th scope="col">ISBN</th>
              <th scope="col">Actions</th>
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
                <button class="btn btn-sm btn-outline-secondary me-2" (click)="edit(book.id)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="books.length === 0">No books found.</p>
      </div>
      <p *ngIf="!books">Loading…</p>
    </div>
  `,
  styles: [
    `
    .books-container { padding: 0.5rem; max-width: 1100px; margin: 0 auto; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
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

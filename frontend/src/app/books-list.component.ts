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
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        <div>
          <h2 class="m-0">Books</h2>
          <p class="text-muted mb-0">Manage the book catalog, edit or remove entries, and add new items.</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-light" (click)="loadBooks()">Refresh</button>
          <button class="btn btn-primary" (click)="create()">Create new book</button>
        </div>
      </div>

      <div *ngIf="books">
        <div class="table-responsive shadow-sm rounded overflow-hidden">
          <table class="table table-striped table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th scope="col" class="sortable" [class.sort-asc]="sortKey==='id' && sortDirection==='asc'" [class.sort-desc]="sortKey==='id' && sortDirection==='desc'" (click)="sortBy('id')">ID</th>
                <th scope="col" class="sortable" [class.sort-asc]="sortKey==='title' && sortDirection==='asc'" [class.sort-desc]="sortKey==='title' && sortDirection==='desc'" (click)="sortBy('title')">Title</th>
                <th scope="col" class="sortable" [class.sort-asc]="sortKey==='author' && sortDirection==='asc'" [class.sort-desc]="sortKey==='author' && sortDirection==='desc'" (click)="sortBy('author')">Author</th>
                <th scope="col" class="sortable" [class.sort-asc]="sortKey==='publishYear' && sortDirection==='asc'" [class.sort-desc]="sortKey==='publishYear' && sortDirection==='desc'" (click)="sortBy('publishYear')">Year</th>
                <th scope="col" class="sortable" [class.sort-asc]="sortKey==='isbn' && sortDirection==='asc'" [class.sort-desc]="sortKey==='isbn' && sortDirection==='desc'" (click)="sortBy('isbn')">ISBN</th>
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
                  <button class="btn btn-sm btn-outline-danger" (click)="delete(book)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p *ngIf="books.length === 0" class="mt-3">No books found.</p>
      </div>
      <p *ngIf="!books">Loading…</p>
    </div>
  `,
  styles: [
    `
    .books-container { padding: 0.5rem; max-width: 1100px; margin: 0 auto; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .sortable { cursor: pointer; user-select: none; }
    .sortable::after { content: ' ▾'; font-size: 0.8rem; opacity: 0.6; }
    .sortable.sort-asc::after { content: ' ▴'; }
    .sortable.sort-desc::after { content: ' ▾'; }
    `
  ]
})
export class BooksListComponent implements OnInit {
  books: Book[] | null = null;
  sortKey: keyof Book = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<Book[]>('/api/books').subscribe({
      next: (data) => {
        this.books = data;
        this.sortBooks();
      },
      error: () => (this.books = [])
    });
  }

  create() {
    this.router.navigate(['/books', 'new']);
  }

  edit(id?: number) {
    if (!id) return;
    this.router.navigate(['/books', 'edit', id]);
  }

  delete(book: Book) {
    if (!book.id) return;
    const confirmed = confirm(`Delete "${book.title}" by ${book.author}?`);
    if (!confirmed) return;

    this.http.delete(`/api/books/${book.id}`).subscribe({
      next: () => this.loadBooks(),
      error: () => alert('Could not delete book.')
    });
  }

  sortBy(key: keyof Book) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.sortBooks();
  }

  private sortBooks() {
    if (!this.books) return;
    this.books.sort((a, b) => {
      const left = a[this.sortKey];
      const right = b[this.sortKey];
      if (left == null && right == null) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      if (typeof left === 'number' && typeof right === 'number') {
        return this.sortDirection === 'asc' ? left - right : right - left;
      }
      const leftText = String(left).toLowerCase();
      const rightText = String(right).toLowerCase();
      return this.sortDirection === 'asc'
        ? leftText.localeCompare(rightText)
        : rightText.localeCompare(leftText);
    });
  }
}

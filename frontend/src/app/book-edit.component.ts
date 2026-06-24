import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Book {
  id?: number;
  title: string;
  author: string;
  description?: string;
  publishYear?: number;
  isbn?: string;
}

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  template: `
    <div class="edit-container card p-3" *ngIf="book">
      <h2 class="h4 mb-3">Edit Book</h2>
      <form (ngSubmit)="save()">
        <div class="mb-2">
          <label class="form-label">Title</label>
          <input class="form-control" name="title" [(ngModel)]="book.title" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Author</label>
          <input class="form-control" name="author" [(ngModel)]="book.author" required />
        </div>
        <div class="row">
          <div class="col-md-4 mb-2">
            <label class="form-label">Year</label>
            <input class="form-control" name="publishYear" type="number" [(ngModel)]="book.publishYear" />
          </div>
          <div class="col-md-8 mb-2">
            <label class="form-label">ISBN</label>
            <input class="form-control" name="isbn" [(ngModel)]="book.isbn" />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Description</label>
          <textarea class="form-control" rows="4" name="description" [(ngModel)]="book.description"></textarea>
        </div>
        <div class="mt-3">
          <button class="btn btn-primary me-2" type="submit">Save</button>
          <button class="btn btn-outline-secondary" type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
    <p *ngIf="!book">Loading…</p>
  `,
  styles: [
    `
    .edit-container { max-width: 900px; margin: 0 auto; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    `
  ]
})
export class BookEditComponent implements OnInit {
  book: Book | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Book>(`/api/books/${id}`).subscribe({ next: b => this.book = b, error: () => this.book = null });
    }
  }

  save() {
    if (!this.book || !this.book.id) return;
    this.http.put<Book>(`/api/books/${this.book.id}`, this.book).subscribe({
      next: () => this.router.navigate(['/books']),
      error: () => alert('Failed to save')
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}

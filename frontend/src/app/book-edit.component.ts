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
    <div class="edit-container" *ngIf="book">
      <h2>Edit Book</h2>
      <form (ngSubmit)="save()">
        <label>Title<br /><input name="title" [(ngModel)]="book.title" required /></label>
        <label>Author<br /><input name="author" [(ngModel)]="book.author" required /></label>
        <label>Year<br /><input name="publishYear" type="number" [(ngModel)]="book.publishYear" /></label>
        <label>ISBN<br /><input name="isbn" [(ngModel)]="book.isbn" /></label>
        <label>Description<br /><textarea name="description" [(ngModel)]="book.description"></textarea></label>
        <div style="margin-top:0.5rem">
          <button type="submit">Save</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
    <p *ngIf="!book">Loading…</p>
  `,
  styles: [
    `
    .edit-container { max-width: 700px; margin: 1rem auto; }
    label { display:block; margin:0.5rem 0; }
    input, textarea { width:100%; padding:0.35rem; }
    button { margin-right:0.5rem; }
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

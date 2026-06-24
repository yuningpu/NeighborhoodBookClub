import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  template: `
    <div class="login-panel card p-4 mx-auto mt-5" style="max-width: 420px;">
      <h2 class="h4 mb-3 text-center">Login</h2>
      <form (ngSubmit)="login()">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" [(ngModel)]="username" name="username" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" [(ngModel)]="password" name="password" required />
        </div>
        <div *ngIf="errorMessage" class="alert alert-danger py-2">{{ errorMessage }}</div>
        <button class="btn btn-primary w-100" type="submit">Sign in</button>
      </form>
      <p class="text-center small mt-3 mb-0">
        Don't have an account? <a routerLink="/signup">Sign up</a>
      </p>
      <p class="text-muted small mt-3 mb-0">Default credentials: <strong>admin/password</strong></p>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/books']),
      error: () => this.errorMessage = 'Invalid username or password.'
    });
  }
}

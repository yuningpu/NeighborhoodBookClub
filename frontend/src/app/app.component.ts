import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'neighborhood-app';
  isDark = true;
  isLoggedIn = false;
  isAdmin = false;
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loggedIn$.subscribe(state => this.isLoggedIn = state);
    this.isAdmin = this.authService.isAdmin();
    this.authService.role$.subscribe(role => this.isAdmin = role === 'ADMIN');
  }

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem('nbc-theme');
      if (saved) {
        this.isDark = saved === 'dark';
      } else {
        this.isDark = true; // default to dark
      }
      this.apply();
    } catch (e) { }
  }

  toggleTheme(){
    this.isDark = !this.isDark;
    try { localStorage.setItem('nbc-theme', this.isDark ? 'dark' : 'light'); } catch(e){}
    this.apply();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private apply(){
    if(this.isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
}

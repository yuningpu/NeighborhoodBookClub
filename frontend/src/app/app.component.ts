import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'neighborhood-app';
  isDark = true;

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

  private apply(){
    if(this.isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
}

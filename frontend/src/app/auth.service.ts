import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'nbc-auth-token';
  private readonly userKey = 'nbc-auth-user';
  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  get loggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/login', { username, password }).pipe(
      map((response) => {
        localStorage.setItem(this.storageKey, response.token);
        localStorage.setItem(this.userKey, response.username);
        this.loggedInSubject.next(true);
        return response;
      })
    );
  }

  signup(username: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/signup', { username, password }).pipe(
      map((response) => {
        localStorage.setItem(this.storageKey, response.token);
        localStorage.setItem(this.userKey, response.username);
        this.loggedInSubject.next(true);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.userKey);
    this.loggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}

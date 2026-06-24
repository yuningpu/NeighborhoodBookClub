import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BehaviorSubject as BS } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'nbc-auth-token';
  private readonly userKey = 'nbc-auth-user';
  private readonly rolesKey = 'nbc-auth-roles';
  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private readonly roleSubject = new BS<string | null>(this.getRole());

  constructor(private http: HttpClient) {}

  get loggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  get role$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/login', { username, password }).pipe(
      map((response) => {
        localStorage.setItem(this.storageKey, response.token);
        localStorage.setItem(this.userKey, response.username);
        localStorage.setItem(this.rolesKey, JSON.stringify(response.roles || ['MEMBER']));
        const primaryRole = (response.roles && response.roles.length > 0) ? response.roles[0] : 'MEMBER';
        this.loggedInSubject.next(true);
        this.roleSubject.next(primaryRole);
        return response;
      })
    );
  }

  signup(username: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/signup', { username, password }).pipe(
      map((response) => {
        localStorage.setItem(this.storageKey, response.token);
        localStorage.setItem(this.userKey, response.username);
        localStorage.setItem(this.rolesKey, JSON.stringify(response.roles || ['MEMBER']));
        const primaryRole = (response.roles && response.roles.length > 0) ? response.roles[0] : 'MEMBER';
        this.loggedInSubject.next(true);
        this.roleSubject.next(primaryRole);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.rolesKey);
    localStorage.removeItem('nbc-auth-role');
    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getRole(): string | null {
    const roles = this.getRoles();
    return roles.length > 0 ? roles[0] : null;
  }

  getRoles(): string[] {
    const value = localStorage.getItem(this.rolesKey);
    if (!value) {
      return [];
    }
    try {
      return JSON.parse(value) as string[];
    } catch {
      return [];
    }
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}

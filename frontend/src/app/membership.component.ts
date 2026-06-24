import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  username: string;
  roles: string[];
}

@Component({
  standalone: true,
  selector: 'app-membership',
  imports: [CommonModule],
  template: `
    <h2>Memberships</h2>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-light">
          <tr><th>ID</th><th>Username</th><th>Roles</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of users"><td>{{u.id}}</td><td>{{u.username}}</td><td>{{u.roles.join(', ')}}</td></tr>
        </tbody>
      </table>
    </div>
  `
})
export class MembershipComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<User[]>('/api/members').subscribe(data => this.users = data);
  }
}

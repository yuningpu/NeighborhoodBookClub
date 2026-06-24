import { Routes } from '@angular/router';
import { BooksListComponent } from './books-list.component';
import { BookEditComponent } from './book-edit.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { MembershipComponent } from './membership.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: BooksListComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksListComponent, canActivate: [AuthGuard] },
  { path: 'books/new', component: BookEditComponent, canActivate: [AuthGuard] },
  { path: 'books/edit/:id', component: BookEditComponent, canActivate: [AuthGuard] },
  { path: 'memberships', component: MembershipComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: '' }
];

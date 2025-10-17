import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as UserActions from '../../state/user/actions';
import { selectAllUsers } from '../../state/user/selectors';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class UserDashboardComponent implements OnInit {
  users$ = this.store.select(selectAllUsers);
  displayedColumns: string[] = ['username', 'email', 'actions'];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.users$.pipe(
      first(),
      tap(users => {
        if (users.length === 0) {
          this.store.dispatch(UserActions.loadUsers());
        }
      })
    ).subscribe();
  }

  addUser(): void {
    // Open a dialog or form to add user
    this.router.navigate(['/add-user']);  // Navigate to add user form
  }

  editUser(user: any): void {
    // Open a dialog or form to edit user
    this.router.navigate(['/edit-user', user.id]);  // Navigate to edit user form
  }

  deleteUser(user: any): void {
    this.store.dispatch(UserActions.deleteUser({ userId: user.id }));
  }
}

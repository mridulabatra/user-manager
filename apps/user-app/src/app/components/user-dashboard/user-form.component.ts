import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../state/user/user.model';
import * as UserActions from '../../state/user/actions';
import { selectUserById } from '../../state/user/selectors';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  jobRoles = ['tech', 'id', 'gd', 'qa'];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobRole: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;

      this.store.select(selectUserById({ id: this.userId })).pipe(
        take(1), 
        switchMap(user => {
          if (!user) {
            this.store.dispatch(UserActions.loadUsers());
            return this.store.select(selectUserById({ id: this.userId! })).pipe(
              filter((user): user is User => !!user), 
              take(1)
            );
          }
          return of(user); 
        })
        )
        .subscribe((user) => this.userForm.patchValue(user));
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      const user: User = {
        id: this.userId!,
        ...this.userForm.value,
      };
      this.store.dispatch(UserActions.editUser({ user }));
    } else {
      this.store.dispatch(UserActions.addUser({ user: this.userForm.value }));
    }
  }
}
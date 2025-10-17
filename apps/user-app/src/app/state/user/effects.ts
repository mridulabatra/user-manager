import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, tap, switchMap } from 'rxjs/operators';
import * as UserActions from './actions';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      map(({ username }) => UserActions.loginSuccess({ username }))
    )
  );

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      );
    },
    { dispatch: false }
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),      
      mergeMap(({ user }) => {
        return this.userService.addUser(user).pipe(
          map(user => UserActions.addUserSuccess({ user })),
          catchError(error => of(UserActions.addUserFailure({ error })))
        )
      })
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      mergeMap(action =>
        this.userService.updateUser(action.user.id!, action.user).pipe(
          map(user => UserActions.editUserSuccess({ user })),
          catchError(error => of(UserActions.editUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId: action.userId })),
          catchError(error => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  // Navigate back to dashboard on success
  formSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUserSuccess, UserActions.editUserSuccess),
    tap(() => this.router.navigate(['/dashboard']))
  ), { dispatch: false });
}

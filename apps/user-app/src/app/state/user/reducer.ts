import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { User } from './user.model';
import * as UserActions from './actions';

export interface State extends EntityState<User> {
  // additional entities state properties
  selectedUserId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.login, (state) =>
    // Clear all users and reset state on new login
    adapter.removeAll({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loginSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return adapter.setAll(users, { ...state, loading: false });
  }),
  on(UserActions.addUserSuccess, (state, { user }) => {
    return adapter.addOne(user, state);
  }),
  on(UserActions.editUserSuccess, (state, { user }) => {
    const update: Update<User> = { id: user.id!, changes: user };
    return adapter.updateOne(update, state);
  }),
  on(UserActions.deleteUserSuccess, (state, { userId }) => {
    return adapter.removeOne(userId, state); 
  }), 
  on(
    UserActions.loginFailure,
    UserActions.loadUsersFailure,
    UserActions.addUserFailure,
    UserActions.editUserFailure,
    UserActions.deleteUserFailure,
    (state, { error }) => ({ ...state, error, isAuthenticated: false, loading: false })
  )
);

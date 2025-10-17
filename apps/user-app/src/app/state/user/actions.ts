import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

// Actions for login
export const login = createAction('[Login Page] User Login', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Auth API] Login Success', props<{ username: string }>());
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: any }>());

// Actions for fetching users
export const loadUsers = createAction('[User API] Load Users');
export const loadUsersSuccess = createAction('[User API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User API] Load Users Failure', props<{ error: any }>());

// Actions for adding, editing, and deleting users
export const addUser = createAction('[User Management] Add User', props<{ user: Partial<User> }>());
export const addUserSuccess = createAction('[User Management] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User Management] Add User Failure', props<{ error: any }>());

export const editUser = createAction('[User Management] Edit User', props<{ user: User }>());
export const editUserSuccess = createAction('[User Management] Edit User Success', props<{ user: User }>());
export const editUserFailure = createAction('[User Management] Edit User Failure', props<{ error: any }>());

export const deleteUser = createAction('[User Management] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User Management] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[User Management] Delete User Failure', props<{ error: any }>());

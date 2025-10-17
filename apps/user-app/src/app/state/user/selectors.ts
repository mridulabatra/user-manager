import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from './reducer';
import { User } from './user.model';

// A selector for the 'user' feature state
export const selectUserState = createFeatureSelector<State>('user');

// Get the selectors from the entity adapter
const { selectAll, selectEntities } = adapter.getSelectors();

// Selector for all users
export const selectAllUsers = createSelector(
  selectUserState,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUserState,
  selectEntities
);

export const selectUserById = ({ id }: { id: number }) => createSelector(
  selectUserEntities,
  (entities) => entities[id]
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state: State) => state.isAuthenticated
);

// Selector for the loading status
export const selectUserLoading = createSelector(
  selectUserState,
  (state: State) => state.loading
);

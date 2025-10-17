import {
  ApplicationConfig,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromUser from './state/user/reducer';
import { UserEffects } from './state/user/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ user: fromUser.reducer }),
    provideEffects([UserEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};

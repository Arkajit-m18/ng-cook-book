import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import { from } from 'rxjs';

@Injectable()

export class AuthEffects {

  @Effect()

  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect()

  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(map((action: AuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({dispatch: false})

  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .pipe(tap(() => {
      this.router.navigate(['/']);
      return firebase.auth().signOut();
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router) {}
}

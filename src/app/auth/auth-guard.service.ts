import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

// import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    // private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(take(1),map((authState: fromAuth.State) => {
        return authState.authenticated;
      })
    );

    // return this.authService.isAuthenticated();
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(take(1),map((authState: fromAuth.State) => {
        return authState.authenticated;
      })
    );
    // return this.authService.isAuthenticated();
  }
}

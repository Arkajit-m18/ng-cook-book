import { Store } from "@ngrx/store";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../auth/auth.service";
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { switchMap, take } from "rxjs/operators";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   console.log('Intercepted', request);
  //   const copiedRequest = request.clone({
  //     params: request.params.set('auth', this.authService.getToken())
  //   });
  //   return next.handle(copiedRequest);

    return this.store.select('auth')
      .pipe(take(1), switchMap((authState: fromAuth.State) => {
        const copiedRequest = request.clone({
          params: request.params.set('auth', authState.token)
        });
        return next.handle(copiedRequest);
      })
    );
  }
}

import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducers';

@Injectable()
export class ShoppingListEffects {

  @Effect()
  ingredientsFetch = this.actions$
    .ofType(ShoppingListActions.FETCH_INGREDIENTS)
    .pipe(switchMap((action: ShoppingListActions.FetchIngredients) => {
      return this.httpClient.get<Ingredient[]>('https://ng-cook-book-38806.firebaseio.com/shoppingList.json', {
        observe: 'body',
        responseType: 'json'
      });
    }),
    map((ingredients: Ingredient[]) => {
      if (!ingredients) {
        ingredients = [];
      }
      return {
        type: ShoppingListActions.SET_INGREDIENTS,
        payload: ingredients
      };
    })
  );

  @Effect({dispatch: false})
  ingredientsStore = this.actions$
    .ofType(ShoppingListActions.STORE_INGREDIENTS)
    .pipe(withLatestFrom(this.store.select('shoppingList')),
    switchMap(([action, state]) => {
      const request = new HttpRequest('PUT', 'https://ng-cook-book-38806.firebaseio.com/shoppingList.json', state.ingredients, {reportProgress: true});
      return this.httpClient.request(request);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>) {}
}

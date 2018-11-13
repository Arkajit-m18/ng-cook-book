import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
// import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable()

export class DataStorageService {
  constructor(
    // private http: Http,
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer asdefhihvsehaggf');
    return this.httpClient.put('https://ng-cook-book-38806.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      observe: 'body',
      // params: new HttpParams().set('auth', token)
      // headers: headers
    });

    // return this.http.put('https://ng-cook-book-38806.firebaseio.com/recipes.json?auth=' + token,
    // this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.get<Recipe[]>('https://ng-cook-book-38806.firebaseio.com/recipes.json', {
      observe: 'body', // response
      responseType: 'json', // text, arraybuffer, blob
      // params: new HttpParams().set('auth', token)
    })
      .pipe(map((recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
    );

    // return this.http.get('https://ng-cook-book-38806.firebaseio.com/recipes.json?auth=' + token)
    //   .pipe(map((response: Response) => {
    //     const recipes: Recipe[] = response.json();
    //     for (let recipe of recipes) {
    //       if (!recipe['ingredients']) {
    //         recipe['ingredients'] = [];
    //       }
    //     }
    //     return recipes;
    //   })
    // );
  }

  storeShoppingItems() {
    const token = this.authService.getToken();
    // return this.httpClient.put('https://ng-cook-book-38806.firebaseio.com/shoppingList.json',
    // this.shoppingListService.getIngredients(), {
    //   params: new HttpParams().set('auth', token)
    // });

    const request = new HttpRequest('PUT', 'https://ng-cook-book-38806.firebaseio.com/shoppingList.json', this.shoppingListService.getIngredients(), {
      reportProgress: true,
      // params: new HttpParams().set('auth', token)
    })
    return this.httpClient.request(request);
  }

  getShoppingItems() {
    const token = this.authService.getToken();
    return this.httpClient.get<Ingredient[]>('https://ng-cook-book-38806.firebaseio.com/shoppingList.json',{
      // params: new HttpParams().set('auth', token)
    })
      .pipe(map((ingredients) => {
        if (!ingredients) {
          ingredients = [];
        }
        return ingredients;
      })
    );
  }
}

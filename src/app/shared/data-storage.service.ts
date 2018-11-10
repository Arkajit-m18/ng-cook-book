import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable()

export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-cook-book-38806.firebaseio.com/recipes.json?auth=' + token,
    this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-cook-book-38806.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
    );
  }

  storeShoppingItems() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-cook-book-38806.firebaseio.com/shoppingList.json?auth=' + token,
    this.shoppingListService.getIngredients());
  }

  getShoppingItems() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-cook-book-38806.firebaseio.com/shoppingList.json?auth=' + token)
      .pipe(map((response: Response) => {
        let ingredients: Ingredient[] = response.json();
        if (!ingredients) {
          ingredients = [];
        }
        return ingredients;
      })
    );
  }
}

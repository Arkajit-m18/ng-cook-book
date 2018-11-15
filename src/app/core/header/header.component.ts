import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Response } from '@angular/http';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response) => {
        console.log(response);
        // console.log(response.type === HttpEventType.Sent);
      }
    );
    this.dataStorageService.storeShoppingItems()
      .subscribe((response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes()
      .subscribe((response: Recipe[]) => {
        this.recipeService.setRecipes(response);
      }
    );
    this.dataStorageService.getShoppingItems()
      .subscribe((response: Ingredient[]) => {
        this.store.dispatch(new ShoppingListActions.FetchIngredients(response));
         // this.shoppingListService.setIngredients(response);
      }
    );
  }

  // onRecipes() {
  //   if (!this.authService.isAuthenticated()){
  //     alert('Sign in first to access the Recipes section')
  //   } else {
  //     this.router.navigate(['Recipes']);
  //   }
  // }

  // onShoppingList() {
  //   if (!this.authService.isAuthenticated()){
  //     alert('Sign in first to access your Shopping List')
  //   } else {
  //     this.router.navigate(['ShoppingList']);
  //   }
  // }

  onLogout() {
    this.store.dispatch(new AuthActions.TryLogout());
    // this.authService.logout();
    // this.router.navigate(['/signin']);
  }

  // isUserAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }
}

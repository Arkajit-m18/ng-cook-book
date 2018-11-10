import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService,
    private router: Router) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      }
    );
    this.dataStorageService.storeShoppingItems()
      .subscribe((response: Response) => {
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
        this.shoppingListService.setIngredients(response);
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
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

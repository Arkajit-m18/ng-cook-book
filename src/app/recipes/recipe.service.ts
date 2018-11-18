// import { Injectable } from "@angular/core";
// import { Subject } from "rxjs";

// import { Recipe } from "./recipe.model";
// import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from "../shopping-list/shopping-list.service";

// @Injectable()

// export class RecipeService {

//     recipesChanged = new Subject<Recipe[]>();

//     private recipes: Recipe[] = [
//         new Recipe(
//             'Test Recipe 1',
//             'This is a test',
//             'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
//             [
//                 new Ingredient('Salmon', 1),
//                 new Ingredient('Fries', 20)
//             ]
//         ),

//         new Recipe(
//             'Test Recipe 2',
//             'This is another test',
//             'https://media.blueapron.com/recipes/2471/square_newsletter_images/1503688588-7-0035-6602/904_2PF_Salmon-Udon-Noodles_84097_WEB_SQ_hi_res.jpg',
//             [
//                 new Ingredient('Buns', 2),
//                 new Ingredient('Meat', 1)
//             ]
//         )
//     ];

//     constructor(
//       private shoppingListService: ShoppingListService) {}

//     getRecipes() {
//         return this.recipes.slice();
//     }

//     setRecipes(recipes: Recipe[]) {
//       this.recipes = recipes;
//       this.recipesChanged.next(this.recipes.slice());
//     }

//     getRecipe(index: number) {
//         return this.recipes[index];
//     }

//     addToShoppingList(ingredients: Ingredient[]) {
//         // this.shoppingListService.addIngredientsToShoppingList(ingredients);
//     }

//     addRecipe(recipe: Recipe) {
//         this.recipes.push(recipe);
//         this.recipesChanged.next(this.recipes.slice());
//     }

//     updateRecipe(index: number, newRecipe: Recipe) {
//         this.recipes[index] = newRecipe;
//         this.recipesChanged.next(this.recipes.slice());
//     }

//     deleteRecipe(index: number) {
//         this.recipes.splice(index, 1);
//         this.recipesChanged.next(this.recipes.slice());
//     }



//     // getRecipeId(recipe: Recipe) {
//     //     return this.recipes.indexOf(recipe);
//     // }
// }

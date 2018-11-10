import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Test Ingredient 1', 5),
        new Ingredient('Test Ingredient 2', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    setIngredients(ingredients: Ingredient[] ) {
      this.ingredients = ingredients;
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsToShoppingList(addedIng: Ingredient[]) {
        // for (let ingredient of addedIng) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...addedIng);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
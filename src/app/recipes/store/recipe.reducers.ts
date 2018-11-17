import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from './recipe.actions';

export interface FeatureState extends fromApp.AppState{
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
        'Baked Salmon',
        'Simple is delicious',
        'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
        [
            new Ingredient('Salmon', 2),
            new Ingredient('Fries', 10),
            new Ingredient('Garlic', 5)
        ]
    ),

    new Recipe(
        'Broiled Salmon',
        'An addicting and easy recipe for your arsenal',
        'https://media.blueapron.com/recipes/2471/square_newsletter_images/1503688588-7-0035-6602/904_2PF_Salmon-Udon-Noodles_84097_WEB_SQ_hi_res.jpg',
        [
            new Ingredient('Salmon', 5),
            new Ingredient('Lemon', 2)
        ]
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

      case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }

    case RecipeActions.UPDATE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes[action.payload.index] = action.payload.updatedRecipe;
      const updatedRecipes = [...oldRecipes];
      return {
        ...state,
        recipes: updatedRecipes
      };

    case RecipeActions.DELETE_RECIPE:
      const recipes = [...state.recipes];
      recipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: recipes
      }

      default:
        return state;
  }
}

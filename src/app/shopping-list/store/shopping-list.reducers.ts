import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: [...action.payload]
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

      case ShoppingListActions.UPDATE_INGREDIENT:
        const currIngredients = [...state.ingredients];
        currIngredients[state.editedIngredientIndex] = {...action.payload.ingredient};
        return {
        ...state,
        ingredients: currIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

      // case ShoppingListActions.FETCH_INGREDIENTS:
      //   return {
      //     ...state,
      //     ingredients: action.payload
      //   };

      case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]}
        return {
          ...state,
          editedIngredient: editedIngredient,
          editedIngredientIndex: action.payload
        };

        case ShoppingListActions.STOP_EDIT:
          return {
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1
          };

    default:
      return state;
  }
}

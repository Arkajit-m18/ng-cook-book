import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const STORE_INGREDIENTS = 'STORE_INGREDIENTS';

export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class SetIngredients implements Action {
  readonly type = SET_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {ingredient: Ingredient}){}
}

export class FetchIngredients implements Action {
  readonly type = FETCH_INGREDIENTS;
  // constructor(public payload: Ingredient[]) {}
}

export class StartEdit implements Action {
  readonly type = 'START_EDIT';
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = 'STOP_EDIT';
}

export class StoreIngredients implements Action {
  readonly type = STORE_INGREDIENTS;
}

export type ShoppingListActions = AddIngredient |
  AddIngredients |
  SetIngredients |
  DeleteIngredient |
  UpdateIngredient |
  FetchIngredients |
  StoreIngredients |
  StartEdit |
  StopEdit;

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription, Observable } from 'rxjs';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit {

    //ingredients: Ingredient[] = [];
    shoppingListState: Observable<{ingredients: Ingredient[]}>
    private subscription: Subscription;

    constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<fromApp.AppState>) {}

    ngOnInit() {
      this.shoppingListState = this.store.select('shoppingList');

        // this.ingredients = this.shoppingListService.getIngredients();
        // this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
        //     this.ingredients = ingredients;
        // });
    }

    onEditItem(index: number) {
      this.store.dispatch(new ShoppingListActions.StartEdit(index));
        // this.shoppingListService.startedEditing.next(index);
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }
}

import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from "./shopping-list.service";
import {i18nGetExtension} from "@angular/compiler-cli/src/transformers/program";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  ingredients: Ingredient[]

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}

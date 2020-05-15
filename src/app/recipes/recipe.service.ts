import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super tasty schnitzel!',
      'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4.jpg',
      [
        new Ingredient('Buns',2),
        new Ingredient('Cheese',2)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }
  getRecipeMethod(){
    return this.recipes.slice(); // will give exactly same array as recipe but the actual one
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }

}

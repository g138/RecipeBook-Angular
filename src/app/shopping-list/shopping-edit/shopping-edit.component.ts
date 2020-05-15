import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  // serverName = '';
  @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    // const ingName = this.serverName;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient);
  }

}

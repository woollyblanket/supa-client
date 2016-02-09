import {Component} from 'angular2/core';
import {ShoppingListItem} from './shoppinglistitem.ts';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css']
})
export class HomeCmp {
	itemList: Array<ShoppingListItem>;
	aShoppingListItem: ShoppingListItem;
	listItem: string = '';

	constructor() {
		this.itemList = [];
		// this.aShoppingListItem = {};
	}

	get diagnostic() {
		return JSON.stringify(this.itemList);
	}

	addShoppingListItem(name: string) {
        this.aShoppingListItem = {
        	'name' : name
        };
        this.itemList.push(this.aShoppingListItem);
        this.listItem = '';
    }

    removeShoppingListItem(item: ShoppingListItem) {
        let index = this.itemList.indexOf(item);
        this.itemList.splice(index, 1);
    }
}

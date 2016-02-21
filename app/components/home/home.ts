import {Component} from 'angular2/core';
import {ShoppingListItem} from './shoppinglistitem.ts';
import {ResultsService} from '../../services/results';
import {Observable} from 'rxjs/Observable';
import {Control} from 'angular2/common';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  providers: [ResultsService]
})
export class HomeCmp {
	itemList: Array<ShoppingListItem>;
	aShoppingListItem: ShoppingListItem;
	listItem: string = '';

	items: Observable<Array<string>>;
	term = new Control();

	constructor(private ResultsService: ResultsService) {
		this.itemList = [];
		this.items = ResultsService.search(this.term.valueChanges);
		// this.aShoppingListItem = {};
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


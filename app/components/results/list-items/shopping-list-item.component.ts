import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductListItem} from '../list-items/product-list-item.model';

@Component({
	selector: 'shopping-list-item',
	templateUrl: './components/results/list-items/shopping-list-item.component.html'
})
export class ShoppingListItemComponent {
	@Input() item: ProductListItem;
	@Output() remove = new EventEmitter;

	removeFromShoppingList() {
		this.remove.emit(this.item);
	}
}
import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductListItem} from '../list-items/product-list-item.model';

@Component({
	selector: 'results-list-item',
	templateUrl: './components/results/list-items/results-list-item.component.html'
})
export class ResultListItemComponent {
	@Input() item: ProductListItem;
	@Output() add = new EventEmitter;

	addToShoppingList() {
		this.add.emit(this.item);
	}
}
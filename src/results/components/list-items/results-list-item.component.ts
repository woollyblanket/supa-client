import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductListItem} from '../../models/product-list-item.model';

@Component({
	selector: 'results-list-item',
	templateUrl: './results/components/list-items/results-list-item.component.html'
})
export class ResultListItemComponent {
	@Input() item: ProductListItem;
	@Output() add = new EventEmitter;

	addToShoppingList() {
		this.add.emit(this.item);
	}
}
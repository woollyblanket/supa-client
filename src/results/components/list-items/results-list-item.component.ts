import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductListItem} from '../../models/product-list-item.model';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'results-list-item',
	templateUrl: './results/components/list-items/results-list-item.component.html',
	directives: [MATERIAL_DIRECTIVES, TOOLTIP_DIRECTIVES]
})
export class ResultListItemComponent {
	@Input() item: ProductListItem;
	@Output() add = new EventEmitter;

	addToShoppingList() {
		this.add.emit(this.item);
	}
}
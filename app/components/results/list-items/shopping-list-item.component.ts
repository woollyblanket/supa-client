import {Component, Input} from 'angular2/core';

@Component({
	selector: 'shopping-list-item',
	templateUrl: './components/results/list-items/shopping-list-item.component.html'
})
export class ShoppingListItemComponent {
	@Input() item: any;
}
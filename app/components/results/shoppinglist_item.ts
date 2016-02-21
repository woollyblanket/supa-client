import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
	selector: 'shoppinglist-item',
	templateUrl: './components/results/shoppinglist_item.html'
})
export class ShoppingListItem {
	@Input() item: any;
	@Input() active: boolean;
	@Output() qtyInc: EventEmitter<any> = new EventEmitter();
	@Output() qtyDec: EventEmitter<any> = new EventEmitter();
	@Output() itemRemovedFromeShoppingList: EventEmitter<any> = new EventEmitter();

	getImageURL(item) {
		if (item.image === null) {
			item.image = './assets/img/image.png';
		}
		return item.image;
	}

	quantityChange(item, total, minus?: boolean) {
		if (item.qty > 0) {
			if (minus) {
				item.qty--;
				this.qtyDec.emit(null);
			} else {
				item.qty++;
				this.qtyInc.emit(null);
			}
		}
		if (item.qty === 0 && !minus) {
			item.qty++;
			this.qtyInc.emit(null);
		}
	}

	removeItem(item) {
		item.added = false;
		this.itemRemovedFromeShoppingList.emit(null);
	}
}
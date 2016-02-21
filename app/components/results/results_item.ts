import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
	selector: 'result-item',
	templateUrl: './components/results/results_item.html'
})
export class ResultItem {
	@Input() item: any;
	@Input() active: boolean;
	@Output() qtyInc: EventEmitter<any> = new EventEmitter();
	@Output() qtyDec: EventEmitter<any> = new EventEmitter();
	@Output() itemAddedToShoppingList: EventEmitter<any> = new EventEmitter();
	
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

	addItem(item) {
		item.added = true;
		this.itemAddedToShoppingList.emit(null);
	}
}
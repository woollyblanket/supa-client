import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
	selector: 'result-item',
	templateUrl: './components/results/results_item.html'
})
export class ResultItem {
	@Input() result: any;
	@Input() active: boolean;
	@Output() qtyInc: EventEmitter<any> = new EventEmitter();
	@Output() qtyDec: EventEmitter<any> = new EventEmitter();
	@Output() activeChange: EventEmitter<any> = new EventEmitter();
	
	getImageURL(result) {
		if (result.image === null) {
			result.image = './assets/img/image.png';
		}
		return result.image;
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

	toggleActiveItem(result) {
		result.active = !result.active;
		this.activeChange.emit(null);
	}
}
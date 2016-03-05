import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FilterCriterion} from '../../models/filter-criterion.model';

@Component({
	selector: 'product-list-property-filter',
	templateUrl: './results/components/filters/product-list-property-filter.component.html'
})
export class ProductListPropertyFilterComponent {
	@Input() criterion: FilterCriterion;
	@Output() clicked = new EventEmitter;

	filter() {
		this.criterion.active = !this.criterion.active;
		this.clicked.emit(this.criterion.value);
	}
}
import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductList} from './../lists/product-list.model';
import {FilterCriterion} from './../filters/filter-criterion.model';

@Component({
	selector: 'product-list-property-filter',
	templateUrl: './components/results/filters/product-list-property-filter.component.html'
})
export class ProductListPropertyFilterComponent {
	@Input() unfilteredList: ProductList;
	@Input() filteredList: ProductList;
	@Input() criterion: FilterCriterion;
	@Output() filteredListChange = new EventEmitter;

	filter() {
		let c = this.criterion;
		c.active = !c.active;
		
		this.filteredList = this.unfilteredList.filter(function(pli, index, list) {
			return c.evaluate(pli);
		});

		this.filteredListChange.emit(this.filteredList);
	}
}
import {Component, Output, EventEmitter} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'sort-product-list',
	templateUrl: './components/results/lists/sort-product-list.component.html',
	directives: [DROPDOWN_DIRECTIVES]
})
export class SortProductListComponent {
	@Output() sort = new EventEmitter;

	sortBy(property:string, inc: boolean = true) {
		this.sort.emit({
			'property': property,
			'inc': inc
		});
	}
}
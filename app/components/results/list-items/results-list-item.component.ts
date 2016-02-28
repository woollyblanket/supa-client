import {Component, Input} from 'angular2/core';

@Component({
	selector: 'results-list-item',
	templateUrl: './components/results/list-items/results-list-item.component.html'
})
export class ResultListItemComponent {
	@Input() item: any;
}
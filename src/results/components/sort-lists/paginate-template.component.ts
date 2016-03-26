import {Component, Input} from 'angular2/core';

@Component({
	selector: 'paginate-template',
	templateUrl: './results/components/sort-lists/paginate-template.component.html',
	styleUrls: ['./results/components/sort-lists/paginate-template.component.css'],
})
export class PaginateTemplateComponent {
	// pagination controles
	@Input() pc;
}
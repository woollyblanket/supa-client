// Angular stuff
import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

// Providers
import {ResultsService} from '../../shared/services/results.service';
import {FilterCriterion} from '../models/filter-criterion.model';
import {FilterCriteria} from '../models/filter-criteria.model';
import {ProductList} from '../models/product-list.model';

// Directives
import {ResultListItemComponent} from './list-items/results-list-item.component';
import {ShoppingListItemComponent} from './list-items/shopping-list-item.component';
import {ProductListPropertyFilterComponent} from './filters/product-list-property-filter.component';
import {SortProductListComponent} from './sort-lists/sort-product-list.component';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

// Pagination
import {PaginatePipe, PAGINATION_DIRECTIVES, PaginationService } from 'ng2-pagination/index';
 
@Component({
	pipes: [PaginatePipe],
	templateUrl: './results/components/results.component.html',
	styleUrls: ['./results/components/results.component.css'],
	providers: [
		ResultsService,
		PaginationService,
		ProductList,
		FilterCriterion,
		FilterCriteria],
	directives: [
		ResultListItemComponent,
		ShoppingListItemComponent,
		ProductListPropertyFilterComponent,
		SortProductListComponent,
		MATERIAL_DIRECTIVES,
		PAGINATION_DIRECTIVES]
})

export class ResultsComponent {
	shoppingList: ProductList = new ProductList([]);
	resultsList: ProductList;
	filteredResultsList: ProductList;

	filterCriteriaCollection: FilterCriteria[] = [];

	resultsPerPage: number = 10;

	constructor(private rs: ResultsService,
				private r: Router,
				private rp: RouteParams) {

		let searchTerms = this.rp.get('searchTerms');

		this.rs.getResults(searchTerms).subscribe(
			response => {
				this.resultsList = new ProductList(response);
				this.filteredResultsList = new ProductList(response);

				let fcs: FilterCriteria = new FilterCriteria();
				let fcq: FilterCriteria = new FilterCriteria();
				let fcc = this.filterCriteriaCollection;

				_.each(this.resultsList.items, function(el, index, list){
					let storeFC = new FilterCriterion('store', '===', el.store);
					let queryFC = new FilterCriterion('query', '===', el.query);

					fcs.addCriterion(storeFC);
					fcq.addCriterion(queryFC);
				});

				fcc.push(fcs);
				fcc.push(fcq);
			},
			err => console.error(err),
			() => console.log('done loading results')
		);
	}

	filterResults(): void {
		var localFcc = this.filterCriteriaCollection;

		this.filteredResultsList = this.resultsList.filter(function(pli) {
			var criteriaMet: boolean = true;

			_.each(localFcc, function(propCriteria: FilterCriteria){
				criteriaMet = criteriaMet && propCriteria.evaluate(pli);
			});

			return criteriaMet;
		});
	}

	addToShoppingList(item: any): void {
		this.shoppingList.addItem(item);
		this.filteredResultsList.removeItem(item);
	}

	removeFromShoppingList(item: any): void {
		this.shoppingList.removeItem(item);
		this.filteredResultsList.addItem(item);
	}

	sortListBy(criteria: {}, list: ProductList) {
		list.sort(criteria['property'], criteria['inc']);
	}

	getSearchTerms(): string {
		return this.rp.get('searchTerms');
	}

	// addAllStoresToFilter() {
	// 	console.log('addAllStoresToFilter called');
	// 	this.storeFilterItems = this.stores.slice();
	// 	this.updateFilteredResults();
	// 	this.resultsTotal = this.getTotal(this.filteredResults);
	// }

	// removeAllStoresFromFilter() {
	// 	console.log('removeAllStoresFromFilter called');
	// 	// everything can be set to empty
	// 	this.storeFilterItems = [];
	// 	this.filteredResults = [];
	// 	this.resultsTotal = 0;
	// }

	// getTotal(list) {
	// 	var grandTotal = 0;
	// 	_.each(list, function(value:any, key:any, obj:any) {
	// 		var total = value.p * value.qty;
	// 		grandTotal += total;
	// 	});
	// 	return grandTotal;
	// }
}

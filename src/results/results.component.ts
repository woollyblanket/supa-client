// Angular stuff
import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

// Providers
import {ResultsService} from '../shared/services/results';
import {FilterCriterion} from './filters/filter-criterion.model';
import {FilterCriteria} from './filters/filter-criteria.model';
import {ProductList} from './lists/product-list.model';

// Directives
import {ResultListItemComponent} from './list-items/results-list-item.component';
import {ShoppingListItemComponent} from './list-items/shopping-list-item.component';
import {ProductListPropertyFilterComponent} from './filters/product-list-property-filter.component';
import {SortProductListComponent} from './lists/sort-product-list.component';

// Pagination
import {PaginatePipe, PAGINATION_DIRECTIVES, PaginationService } from 'ng2-pagination/index';
 
@Component({
	pipes: [PaginatePipe],
	templateUrl: './components/results/results.component.html',
	styleUrls: ['./components/results/results.component.css'],
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
		console.log(typeof item);
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

	// incTotal(item, total) {
	// 	console.log('incTotal called');
	// 	total += item.p;
	// 	return total;
	// }

	// decTotal(item, total) {
	// 	console.log('decTotal called');
	// 	total -= item.p;
	// 	return total;
	// }

	// sortBy(list, property: string) {
	// 	console.log('sortBy called');
	// 	list = _.sortBy(list, property);
	// 	return list;
	// }

	// sortByDec(list, property: string) {
	// 	console.log('sortByDec called');
	// 	list = _.sortBy(list, property).reverse();
	// 	return list;
	// }

	// addItemToShoppingList(item) {
	// 	this.filteredResults = _.without(this.filteredResults, item);
	// 	this.shoppinglist.push(item);
	// 	this.shoppinglistTotal = this.getTotal(this.shoppinglist);
	// }

	// removeItemFromShoppingList(item) {
	// 	this.shoppinglist = _.without(this.shoppinglist, item);
	// 	this.filteredResults.push(item);
	// 	this.shoppinglistTotal = this.getTotal(this.shoppinglist);
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

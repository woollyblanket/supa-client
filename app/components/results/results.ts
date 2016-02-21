import {Component} from 'angular2/core';
import {ResultsService} from '../../services/results';
import {StorePipe} from './store_pipe';
import {ResultItem} from './results_item';
import {ShoppingListItem} from './shoppinglist_item';
import {NgClass} from 'angular2/common';
import * as _ from 'underscore'; 
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {RouteParams, Router} from 'angular2/router';

@Component({
	pipes: [StorePipe],
	templateUrl: './components/results/results.html',
	styleUrls: ['./components/results/results.css'],
	providers: [ResultsService],
	directives: [ResultItem, ShoppingListItem, NgClass, DROPDOWN_DIRECTIVES]
})

/* 
TO DO:
- Add filter for categories
- Add/remove all categories from the filter
- Construct a category tree
*/

export class ResultsCmp { 
	// unmodified results recieved from the API
	results: any;
	// results after this user has filtered them
	filteredResults: any;
	
	// list of items the user wants to buy
	shoppinglist: any = [];

	// dynamically populated list of stores based on the results returned 
	// from the API
	stores: Array<string> = [];
	// stores to filter the item lists by
	storeFilterItems: Array<string> = [];

	// dynamically populated list of keywords based on the results returned 
	// from the API
	keywords: Array<string> = [];
	// keywords to filter the item lists by
	keywordFilterItems: Array<string> = [];

	// overall total of results taking into account quantity and items added
	// or removed from the list
	resultsTotal: number = 0;
	// overall total of results before modification
	total: number = 0;

	// overall total of items added to the shopping list, taking into account
	// qunatities 
	shoppinglistTotal: number = 0;

	constructor(private ResultsService: ResultsService, private Router: Router, private RouteParams: RouteParams ) {
		let searchTerms = this.RouteParams.get('searchTerms');
		this.ResultsService.getResults(searchTerms).subscribe(
			stuff => {

					// populate the results and filteredResults arrays
					this.results = stuff;

					var extraProperties = {
						qty: 1,
						// if the item is added to the shopping list
						added: false,
						categories: []
					};

					var aTotal: number = 0;

					_.each(this.results, function(value :any, key:any, obj:any) { 
						value = _.extend(value, extraProperties);
						aTotal += value.price; 
						value.categories = value.category.split('|');
					});

					// get the stores and keywords from the results
					this.stores = _.uniq(_.pluck(this.results, 'store'));
					this.keywords = _.uniq(_.pluck(this.results, 'keyword')); 

					// set the filters
					this.storeFilterItems = this.stores.slice();
					this.keywordFilterItems = this.keywords.slice();

					// set the results and total
					this.filteredResults = this.results.slice();
					this.total = aTotal;
					this.resultsTotal = aTotal;

				},
				err => console.error(err), 
				() => console.log('done loading results')
			);
	}

	// add/remove items from the filterList
	toggleFilter(item, filterList) {
		console.log('toggleFilter called');
		var index = filterList.indexOf(item);
		if (index !== -1) {
			// item is there, remove item
			filterList.splice(index, 1);
		} else {
			// item isn't there, add it
			filterList.push(item);
		}

		this.updateFilteredResults();
		this.resultsTotal = this.getTotal(this.filteredResults);
	}

	updateListByFilter(masterList: Array<any>, filterList: Array<any>, property: string) {
		console.log('updateListByFilter called');
		// the list has been filtered. For example, by adding/removing a store

		// masterlist = the set of all possible items
		// filterList = an array of filters we want to filter by
		// property = what we want to apply the filterList to
		return _.filter(masterList, function(item) {
			return _.contains(filterList, item[property]) && !item.added;
		});
	}

	updateFilteredResults() {
		var updatedStoreList = this.updateListByFilter(this.results, this.storeFilterItems, 'store');
		var updatedKeywordLists = this.updateListByFilter(this.results, this.keywordFilterItems, 'keyword');

		this.filteredResults = _.intersection(updatedStoreList, updatedKeywordLists);
	}

	addAllStoresToFilter() {
		console.log('addAllStoresToFilter called');
		this.storeFilterItems = this.stores.slice();
		this.updateFilteredResults();
		this.resultsTotal = this.getTotal(this.filteredResults);
	}

	removeAllStoresFromFilter() {
		console.log('removeAllStoresFromFilter called');
		// everything can be set to empty
		this.storeFilterItems = [];
		this.filteredResults = [];
		this.resultsTotal = 0;
	}

	addAllKeywordsToFilter() {
		console.log('addAllKeywordsToFilter called');
		this.keywordFilterItems = this.keywords.slice();
		this.updateFilteredResults();
		this.resultsTotal = this.getTotal(this.filteredResults);
	}

	removeAllKeywordsFromFilter() {
		console.log('removeAllKeywordsFromFilter called');
		// everything can be set to empty
		this.keywordFilterItems = [];
		this.filteredResults = [];
		this.resultsTotal = 0;
	}

	incTotal(item, total) {
		console.log('incTotal called');
		total += item.price;
		return total;
	}

	decTotal(item, total) {
		console.log('decTotal called');
		total -= item.price;
		return total;
	}

	sortBy(list, property: string) {
		console.log('sortBy called');
		list = _.sortBy(list, property);
		return list;
	}

	sortByDec(list, property: string) {
		console.log('sortByDec called');
		list = _.sortBy(list, property).reverse();
		return list;
	}

	addItemToShoppingList(item) {
		this.filteredResults = _.without(this.filteredResults, item);
		this.shoppinglist.push(item);
		this.shoppinglistTotal = this.getTotal(this.shoppinglist);
	}

	removeItemFromShoppingList(item) {
		this.shoppinglist = _.without(this.shoppinglist, item);
		this.filteredResults.push(item);
		this.shoppinglistTotal = this.getTotal(this.shoppinglist);
	}

	getTotal(list) {
		var grandTotal = 0;
		_.each(list, function(value:any, key:any, obj:any) {
			var total = value.price * value.qty;
			grandTotal += total;
		});
		return grandTotal;
	}
}

import {Component} from 'angular2/core';
import {ResultsService} from '../../services/results';
import {StorePipe} from './store_pipe';
import {ResultItem} from './results_item';
import {NgClass} from 'angular2/common';
import * as _ from 'underscore'; 
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	pipes: [StorePipe],
	templateUrl: './components/results/results.html',
	styleUrls: ['./components/results/results.css'],
	providers: [ResultsService],
	directives: [ResultItem,NgClass,DROPDOWN_DIRECTIVES]
})

/* 
TO DO:
- Add filter for categories
- Add/remove all categories from the filter
- Construct a category tree
*/

export class ResultsCmp { 
	results: any;
	filteredResults: any;
	filteredResultsInactive: any = [];

	stores: Array<string> = [];
	storeFilterItems: Array<string> = [];

	keywords: Array<string> = [];
	keywordFilterItems: Array<string> = [];

	total: number = 0;
	unfilteredTotal: number = 0;

	showActive: boolean = true;

	constructor(private ResultsService: ResultsService) {
		this.ResultsService.getResults().subscribe(
			stuff => {
					// populate the results and filteredResults arrays
					this.results = stuff;

					for (var i = 0; i < stuff.length; i++) {
						var item = stuff[i];
						this.results[i].qty = 1;
						this.results[i].active = true;

						this.total += item.price; 

						if (this.stores.indexOf(item.store) === -1) {
							this.stores.push(item.store);
							// alphabetise the list
							this.stores.sort();
						}

						if (this.keywords.indexOf(item.keyword) === -1) {
							this.keywords.push(item.keyword);
							// alphabetise the list
							this.keywords.sort();
						}
					}
					this.unfilteredTotal = this.total;
					this.filteredResults = this.results.slice();
					this.addAllStoresToFilter();
					this.addAllKeywordsToFilter(); 
				},
				err => console.error(err), 
				() => console.log('done loading results')
			);
	}

	toggleFilter(item, filterList) {
		var index = filterList.indexOf(item);
		if (index !== -1) {
			// store is there, remove store
			filterList.splice(index, 1);
		} else {
			// store isn't there, add it
			filterList.push(item);
		}

		// update results
		this.updateFilteredResults();
	}
	
	// create a function for adding/removing items from the filtered results as needed
	updateFilteredResults() {
		// start with nothing included
		var updatedResults = [];
		var updatedResultsInactive = [];
		this.total = 0;

		// update results based on stores in the store filter
		for (var i = 0; i < this.results.length; i++) {
			var item = this.results[i];

			for (var j = 0; j < this.storeFilterItems.length; j++) {
				var store = this.storeFilterItems[j];

				for (var k = 0; k < this.keywordFilterItems.length; k++) {
					var keyword = this.keywordFilterItems[k];

					if (keyword === item.keyword && store === item.store) {
						if(item.active) {
							updatedResults.push(item);
							this.total += item.price * item.qty;
						} else {
							updatedResultsInactive.push(item);
						}
						
					}
				}
			}
		}
		this.filteredResultsInactive = updatedResultsInactive;
		this.filteredResults = updatedResults;
	}

	addAllStoresToFilter() {
		this.storeFilterItems = this.stores.slice();
		this.updateFilteredResults();
	}

	removeAllStoresFromFilter() {
		this.storeFilterItems = [];
		this.filteredResults = [];
		this.total = 0;
	}

	addAllKeywordsToFilter() {
		this.keywordFilterItems = this.keywords.slice();
		this.updateFilteredResults();
	}

	removeAllKeywordsFromFilter() {
		this.keywordFilterItems = [];
		this.filteredResults = [];
		this.total = 0;
	}

	incTotal(item) {
		this.total += item.price;
	}

	decTotal(item) {
		this.total -= item.price;
	}

	showActiveItems(aBool) { 
		if(aBool) {
			// show active
			this.showActive = true;
		} else {
			// show inactive
			this.showActive = false;
		}
	}

	sortBy(property: string) {
		this.filteredResults = _.sortBy(this.filteredResults, property);
	}

	sortByDec(property: string) {
		this.filteredResults = _.sortBy(this.filteredResults, property).reverse();
	}
}

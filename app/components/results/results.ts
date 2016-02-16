import {Component} from 'angular2/core';
import {ResultsService} from '../../services/results';
import {StorePipe} from './store_pipe';
import {ResultItem} from './results_item';

@Component({
	pipes: [StorePipe],
	templateUrl: './components/results/results.html',
	styleUrls: ['./components/results/results.css'],
	providers: [ResultsService],
	directives: [ResultItem]
})

/* 
TO DO:
- Add filter for categories
- Add/remove all categories from the filter
- Construct a category tree
- Make items active/inactive
- Add button to show inactive items
*/

export class ResultsCmp { 
	results: any;
	filteredResults: any;

	stores: Array<string> = [];
	storeFilterItems: Array<string> = [];

	keywords: Array<string> = [];
	keywordFilterItems: Array<string> = [];

	total: number = 0;
	unfilteredTotal: number = 0;

	constructor(private ResultsService: ResultsService) {
		this.ResultsService.getResults().subscribe(
			stuff => {
					// populate the results and filteredResults arrays
					this.results = stuff;

					for (var i = 0; i < stuff.length; i++) {
						var item = stuff[i];
						this.results[i].qty = 1;

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
		this.total = 0;

		// update results based on stores in the store filter
		for (var i = 0; i < this.results.length; i++) {
			var item = this.results[i];

			for (var j = 0; j < this.storeFilterItems.length; j++) {
				var store = this.storeFilterItems[j];

				for (var k = 0; k < this.keywordFilterItems.length; k++) {
					var keyword = this.keywordFilterItems[k];

					if (keyword === item.keyword && store === item.store) {
						updatedResults.push(item);
						this.total += item.price * item.qty;
					}
				}
			}
		}

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
}

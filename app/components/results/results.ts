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
- Add/remove all stores from the filter - DONE
- Add filter for keywords
- Add/remove all keywords from the filter
- Add filter for categories
- Add/remove all categories from the filter
- Construct a category tree
- Make items active/inactive
- Add button to show inactive items
- Add quantity - DONE
- Sum amounts taking into account the filters applied

*/
export class ResultsCmp { 
	results: any;
	filteredResults: any;

	stores: Array<string> = [];
	storeFilterItems: Array<string> = [];

	total: number = 0;

	constructor(private ResultsService: ResultsService) {
		this.ResultsService.getResults().subscribe(
			stuff => {
					// populate the results and filteredResults arrays
					this.results = stuff;

					// this.populateStoresList(stuff);
					for (var i = 0; i < stuff.length; i++) {
						var item = stuff[i];
						this.results[i].qty = 1;

						this.total += item.price;

						if (this.stores.indexOf(item.store) === -1) {
							this.stores.push(item.store);
							// alphabetise the list
							this.stores.sort();
						}
					}

					this.filteredResults = this.results.slice();
					this.addAllStoresToFilter();
				},
				err => console.error(err),
				() => console.log('done loading results')
			);
	}

	toggleStoreFilter(store) {
		// ensure the storeFilterItems array has the stores required
		var index = this.storeFilterItems.indexOf(store);
		// have to use this temp array as pipes don't do deep change detection
		// creating a new array and overwriting the old one fixes this
		// slice() creates a new duplicate of an array
		var temp = this.storeFilterItems;
		if (index !== -1) {
			// store is there, remove store
			temp.splice(index, 1);
			this.storeFilterItems = temp.slice();
		} else {
			// store isn't there, add it
			temp.push(store);
			this.storeFilterItems = temp.slice();
		}

		// update results
		this.updateFilteredResults();
	}
	
	// create a function for adding/removing items from the filtered results as needed
	updateFilteredResults() {
		var updatedResults = [];
		this.total = 0;

		// update results based on stores in the store filter
		for (var i = 0; i < this.results.length; i++) {
			var item = this.results[i];

			for (var j = 0; j < this.storeFilterItems.length; j++) {
				var store = this.storeFilterItems[j];

				if(store === item.store) {
					updatedResults.push(item);
					this.total += item.price * item.qty;
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

	incTotal(item) {
		this.total += item.price * item.qty;
	}

	decTotal(item) {
		this.total -= item.price * item.qty;
	}
}

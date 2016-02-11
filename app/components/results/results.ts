import {Component} from 'angular2/core';
import {ResultsService} from '../../services/results';
import {StorePipe} from './store_pipe';

@Component({
	selector: 'results',
	pipes: [StorePipe],
	templateUrl: './components/results/results.html',
	styleUrls: ['./components/results/results.css'],
	providers: [ResultsService]
})
export class ResultsCmp { 
	results: any;
	stores: Array<string> = [];

	storeFilterItems: Array<string> = [];

	constructor(private ResultsService: ResultsService) {
		this.ResultsService.getResults().subscribe(
			stuff => {
					this.results = stuff;
					// this.populateStoresList(stuff);
					for (var i = 0; i < stuff.length; i++) {
						var item = stuff[i];

						if (this.stores.indexOf(item.store) === -1) {
							this.stores.push(item.store);
							// alphabetise the list
							this.stores.sort();
						}
					}

					this.storeFilterItems = this.stores.slice();
				},
				err => console.error(err),
				() => console.log('done loading results')
			);
	}

	toggleStoreFilter(store) {
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
	}

	getImageURL(result) {
		if (result.image === 'null') {
			result.image = 'http://dummyimage.com/100x100/000000/fff.png&text=No+image';
		}
		return result.image;
	}
}

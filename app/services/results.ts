import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class ResultsService {
	private results: any;
	private stores: Array<string> = [];

	constructor(private http: Http) { 
		this.populateResultsList();
	}

	getStores(): any {
		return this.stores;
	}

	getResults(): any {
		return this.results;
	}

	private populateResultsList() {
		this.http.get('http://localhost:5555/app/assets/results.dummy.json')
			.map(res => res.json())
			.subscribe(
				stuff => {
					this.results = stuff;
					this.populateStoresList(stuff);
				},
				err => console.error(err),
				() => console.log('done loading results')
			);
	}

	private populateStoresList(data) {
		for (var i = 0; i < data.length; i++) {
			var item = data[i];

			if (this.stores.indexOf(item.store) === -1) {
				this.stores.push(item.store);
				// alphabetise the list
				this.stores.sort();
			}
		}
	}
}
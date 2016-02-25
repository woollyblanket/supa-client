import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import * as _ from 'underscore'; 

@Injectable()
export class ResultsService {
	storeLookup = [
		{
			'name': 'Tesco',
			'key': 't',
			'imageURL': 'http://img.tesco.com/Groceries/pi/'
		},
		{
			'name': 'Aldi',
			'key': 'a',
			'imageURL': 'http://www.aldi.ie/typo3temp/pics/'
		},
		{
			'name': 'SuperValu',
			'key': 's',
			'imageURL': 'http://shop.supervalu.ie/shopping/images/products/medium/'
		}
	];

	constructor(private http: Http) { 
	}

	// should return an observable that we subscribe to, rather than returning the 
	// actual results.
	getResults(querylist: string): any {
		//return this.http.get('http://localhost:5555/app/assets/results.dummy.json')
		return this.http.get('http://tranquil-tundra-3993.herokuapp.com/search/' + querylist)
			.map(res => res.json());
	}

	getImageURL(item) {
		if (item.im === null || !item.im) {
			return './assets/img/image.png';
		} else {
			var storeURL = _.findWhere(this.storeLookup, { key: item.s }).imageURL;
			var replaced = item.im.replace('_3', '_2');

			return storeURL + replaced;
		}
	}

	getStoreNameByItem(item) {
		return _.findWhere(this.storeLookup, { key: item.s }).name;
	}

	getStoreNameByKey(key) {
		return _.findWhere(this.storeLookup, { key: key }).name;
	}

	autocomplete(terms: Observable<string>, debounceDuration = 400) {
		return terms.debounceTime(debounceDuration)
			.distinctUntilChanged()
			.switchMap(term => {
				var temp;
				var trimmed = term.toString().trim();

				if (_.size(trimmed) > 0) {
					temp = this.rawSearch(trimmed);
				} else {
					temp = Observable.of([]);
				}
				return temp;
			});
	}

	rawSearch(term) {
		return this.http
			.get('http://tranquil-tundra-3993.herokuapp.com/autocomplete/' + term)
			.map((res) => res.json());
	}
}
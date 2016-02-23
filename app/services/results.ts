import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import * as _ from 'underscore'; 

@Injectable()
export class ResultsService {

	constructor(private http: Http) { 
	}

	// should return an observable that we subscribe to, rather than returning the 
	// actual results.
	getResults(querylist: string): any {
		//return this.http.get('http://localhost:5555/app/assets/results.dummy.json')
		return this.http.get('http://tranquil-tundra-3993.herokuapp.com/search/' + querylist)
			.map(res => res.json());
	}

	autocomplete(terms: Observable<string>, debounceDuration = 400) {
		return terms.debounceTime(debounceDuration)
			.distinctUntilChanged()
			.switchMap(term => {
				var temp;
				var trimmed = term.toString().trim();
				console.log('length', trimmed.length);
				
				if (_.size(trimmed) > 0) {
					console.log('size > 0', trimmed);
					temp = this.rawSearch(trimmed);
				} else {
					console.log('size !> 0', trimmed);
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
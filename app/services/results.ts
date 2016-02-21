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

	search(terms: Observable<string>, debounceDuration = 400) {
		return terms.debounceTime(debounceDuration)
			.distinctUntilChanged()
			.switchMap(term => _.size(term) > 0 ? this.rawSearch(term) : Observable.of([]));
	}

	rawSearch(term) {
		return this.http
			.get('http://tranquil-tundra-3993.herokuapp.com/autocomplete/' + term)
			.map((request) => request.json());
	}
}
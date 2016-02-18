import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class ResultsService {

	constructor(private http: Http) { 
	}

	// should return an observable that we subscribe to, rather than returning the 
	// actual results.
	getResults(): any {
		//return this.http.get('http://localhost:5555/app/assets/results.dummy.json')
		return this.http.get('http://tranquil-tundra-3993.herokuapp.com/search/chicken%7Cmilk')
			.map(res => res.json());
	}
}
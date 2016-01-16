import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class ResultsService {
	results: any;

	constructor(http: Http) {
		this.results = http.get('./assets/results.dummy.json')
			.map(response => response.json());
	}
}
import {Component} from 'angular2/core';
import {ResultsService} from '../../services/results';

@Component({
	selector: 'results',
	templateUrl: './components/results/results.html',
	styleUrls: ['./components/results/results.css'],
	providers: [ResultsService]
})
export class ResultsCmp { 
	results: any;

	constructor(ResultsService: ResultsService) {
		ResultsService.results
			.subscribe(
				results => this.results = results,
				error => console.error('Error: ' + error),
				() => console.log('Completed!')
			);
	}

	getImageURL(result) {
		if (result.image === 'null') {
			result.image = 'http://dummyimage.com/100x100/000000/fff.png&text=No+image';
		}
		return result.image;
	}
}

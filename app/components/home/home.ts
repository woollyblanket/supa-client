import {Component} from 'angular2/core';
import {ShoppingListItem} from './shoppinglistitem.ts';
import {ResultsService} from '../../services/results';
import {Observable} from 'rxjs/Observable';
import {Control, FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  providers: [ResultsService],
  directives: [DROPDOWN_DIRECTIVES, FORM_DIRECTIVES]
})

export class HomeCmp {
	itemList: Array<ShoppingListItem>;
	aShoppingListItem: ShoppingListItem;

	listItem: string = '';

	items: Observable<Array<string>>;
	term = new Control();

	constructor(private ResultsService: ResultsService, 
				private Router: Router,
				routeParams: RouteParams) {
		
		this.itemList = [];
		this.items = ResultsService.autocomplete(this.term.valueChanges);
	}

	onSearch(terms) {
		// terms is currently in the format [{'name':'a name'},{'name':'another name'}]
		// flatten the array and stringify it separated by '|'

		if (terms.length === 0) { return; }

		var tempArray: Array<string> = [];
		var tempDeliminatedList: string = '';

		_.each(terms, function(value: any, key: any, obj: any) {
			tempArray.push(value.name);
		});

		tempDeliminatedList = tempArray.join('|');
		this.Router.navigate(['Results', { searchTerms: tempDeliminatedList }]);
	}

	addShoppingListItem(name: string) {
		// don't allow empty strings

		name = name.trim();

		if (name === '') {
			return;
		}

		this.aShoppingListItem = {
			'name' : name
		};
		this.itemList.push(this.aShoppingListItem);
		this.listItem = '';
	}

	removeShoppingListItem(item: ShoppingListItem) {
		let index = this.itemList.indexOf(item);
		this.itemList.splice(index, 1);
	}
}


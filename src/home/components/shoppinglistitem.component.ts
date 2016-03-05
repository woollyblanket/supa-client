import {Injectable} from 'angular2/core';

@Injectable()
export class ShoppingListItemComponent {
	name: string;

	constructor(name) {
        this.name = name;
    }
}
import {Injectable} from 'angular2/core';

@Injectable()
export class ShoppingListItem {
	name: string;

	constructor(name) {
        this.name = name;
    }
}
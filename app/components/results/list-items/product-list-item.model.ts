import * as _ from 'underscore';
import {Injectable} from 'angular2/core';

@Injectable()
export class ProductListItem { 
	private _qty: number;
	private _price: number;
	private _name: string;
	private _store: string;
	private _query: string;
	private _id: string;
	private _categories: string[];
	private _image: string;
	private _measure: string;
	private _priceDesc: string;
	private _promo: string;
	private _limited: string;

	private _storeLookup = [
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

	constructor(anItem:Object) {
		this._qty = 1;
		this._price = anItem['p'] || 0;
		this._name = anItem['n'] || '';
		this._store = _.findWhere(this._storeLookup, { key: anItem['s'] }).name || '';
		this._query = anItem['q'] || '';
		this._id = anItem['id'] || '';
		this._categories = anItem['c'].split('|') || [];
		this._measure = anItem['m'] || '';
		this._priceDesc = anItem['pd'] || '';
		this._promo = anItem['pr'] || '';
		this._limited = anItem['l'] || '';

		if (anItem['im'] === null || !anItem['im']) {
			this._image = './assets/img/image.png';
		} else {
			this._image = _.findWhere(this._storeLookup, { key: anItem['s'] }).imageURL + anItem['im'];
		}
	}

	get qty(): number {
		return this._qty;
	}

	get price(): number {
		return this._price;
	}

	get name(): string {
		return this._name;
	}

	get store(): string {
		return this._store;
	}

	get query(): string {
		return this._query;
	}

	get id(): string {
		return this._id;
	}

	get categories(): string[] {
		return this._categories;
	}

	get image(): string {
		return this._image;
	}

	get measure(): string {
		return this._measure;
	}

	get priceDesc(): string {
		return this._priceDesc;
	}

	get promo():string {
		return this._promo;
	}

	get limited():string{
		return this._limited;
	}

	plusQty(): void {
		this._qty++;
	}

	minusQty(): void {
		if(this._qty > 0) {
			this._qty--;
		}
	}
}
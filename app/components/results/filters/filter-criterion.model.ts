import {Injectable} from 'angular2/core';
import {ProductListItem} from '../list-items/product-list-item.model';

@Injectable()
export class FilterCriterion {
	private _operator: string;
	private _property: string;
	private _value: string;
	private _active: boolean;

	constructor(prop: string, op: string, val: string) {
		if (op === '===' || op === '!==' || op === 'contains' || op === '!contain') {
			this._operator = op;
		} else {
			this._operator = 'unknown';
		}
		
		this._property = prop;
		this._value = val;
		this._active = true;
	} 

	get operator() {
		return this._operator;
	}

	get property() {
		return this._property;
	}

	get value() {
		return this._value;
	}

	get active() {
		return this._active;
	}

	public evaluate(item: ProductListItem): boolean {

		if(!this._active) {
			return false;
		}

		switch (this._operator) {
			case '===':
				if (item[this._property] === this._value) {
					return true;
				}
				break;
			case '!==':
				if(item[this._property] !== this._value) {
					return true;
				}
				break;
			case 'contains':
				if (item[this._property].indexOf(this._value) !== -1) {
					return true;
				}
				break;
			case '!contain':
				if (item[this._property].indexOf(this._value) === -1) {
					return true;
				}
				break;
			default:
				return false;
		}
	}
}
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

	get operator(): string {
		return this._operator;
	}

	get property(): string {
		return this._property;
	}

	get value(): string {
		return this._value;
	}

	set value(aString: string) {
		this._value = aString;
	}

	get active(): boolean {
		return this._active;
	}

	set active(aBool: boolean) {
		this._active = aBool;
	}

	public evaluate(item: ProductListItem): boolean {

		if(!this._active) {
			return false;
		}

		var searchRegEx = new RegExp(this._value, 'i');

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
				return searchRegEx.test(item[this._property]);
			case '!contain':
				return !searchRegEx.test(item[this._property]);
			default:
				return false;
		}
	}
}
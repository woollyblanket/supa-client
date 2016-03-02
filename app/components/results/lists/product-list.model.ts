import * as _ from 'underscore';
import {ProductListItem} from '../list-items/product-list-item.model';
import {Injectable} from 'angular2/core';

@Injectable()
export class ProductList { 
	private _list: Array<ProductListItem>;

	constructor(aList: Object[]) {
		this._list = new Array<ProductListItem>();
		var lst = this._list;
		_.each(aList, function(value: any, key: any, obj: any) {
			if (value instanceof ProductListItem) {
				lst.push(value);
			} else {
				var aListItem = new ProductListItem(value);
				lst.push(aListItem); 
			}
		});
	}

	count() : number {
		// this just returns the how many plis are in the list
		// but doesn't take into account the quantity of each pli
		// return this._list.length;
		let count = 0;
		_.each(this._list, function(el){
			count += el.qty;
		});
		return count;
	}

	get items(): Array<ProductListItem> {
		// fix this later. When uncommenting I get the old 'has changed after it was checked' error
		// var ret: Array<ProductListItem>;
		// ret = this._list.slice();
		// return ret;
		return this._list;
	}

	sort(property: string, inc: boolean = true): void {
		if(inc) {
			this._list = _.sortBy(this._list, property);
		} else {
			this._list = _.sortBy(this._list, property).reverse();
		}
		
	}

	filter(fn: (pli: ProductListItem) => boolean): ProductList {
		return new ProductList(_.filter(this._list, fn));
	}
	/*
	Example call

	var tescoList = filter(function(pli:ProductListItem){
		return pli.store === "Tesco";
	});
	*/

	// allowing a function to be called for every item on the list
	visit(fn: (pli: ProductListItem) => void): void {
		_.each(this._list, fn);
	}

	select(index: number, count: number): ProductList {
		// manage unhappy path
		// important to detect errors, but not react to them (yet)
		return new ProductList(this._list.slice(index, index + count));
	}

	addItem(anItem: ProductListItem): void {
		this._list.push(anItem);
	}

	removeItem(anItem: ProductListItem): void {
		this._list = _.without(this._list, anItem);
	}
}
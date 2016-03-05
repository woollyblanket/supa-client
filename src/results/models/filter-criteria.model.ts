import {Injectable} from 'angular2/core';
import {FilterCriterion} from './filter-criterion.model';
import {ProductListItem} from './product-list-item.model';
import * as _ from 'underscore';

@Injectable()
export class FilterCriteria {
	private _criteria: FilterCriterion[];

	constructor() {
		this._criteria = [];
	}

	get items(): Array<FilterCriterion> {
		return this._criteria;
	}

	addCriterion(filter: FilterCriterion): void {
		if(_.findWhere(this._criteria, filter) === undefined) {
			this._criteria.push(filter);
		}
	}

	evaluate(item: ProductListItem): boolean {
		var result = false;

		_.each(this._criteria, function(el, index, list) {
			result = result || el.evaluate(item);
		});
		
		return result;
	}
}
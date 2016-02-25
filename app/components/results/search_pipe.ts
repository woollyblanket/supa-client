import {Pipe} from 'angular2/core';

@Pipe({
	name: 'search'
})
export class SearchPipe {
	transform(value, [term]) {
		if (!value) { return; }
		// return value.filter((item)=>item.n.startsWith(term));
		return value.filter(item => {

			if (item.n.toLowerCase().indexOf(term) !== -1) {
				return item;
			}
		});
	}
}
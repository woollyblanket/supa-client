import {Pipe} from 'angular2/core';

@Pipe({
	name: 'storeFilter'
})
export class StorePipe {
	transform(value, args?) {
		if (!value) { return; }

		let [stores] = args;
		return value.filter(item => { 
			if(stores.indexOf(item.store) !== -1) {
				return item.store;
			}
		});
	}
}
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import {NameList} from '../../services/name_list';

@Component({
  selector: 'about',
  templateUrl: './components/about/about.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES]
})
export class AboutCmp {
  newName: string;
  constructor(public list: NameList) {}
 /*
 * @param newname  any text as input.
 * @returns return false to prevent default form submit behavior to refresh the page.
 */
  addName(): boolean {
    this.list.add(this.newName);
    this.newName = '';
    return false;
  }
}

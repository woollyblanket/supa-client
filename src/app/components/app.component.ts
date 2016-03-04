import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../../home/home';
import {AboutComponent} from '../../about/about';
import {ResultsComponent} from '../../results/results.component';
import {NameListService} from '../../shared/services/name-list.service';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  moduleId: module.id,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@RouteConfig([
	{ path: '/',      name: 'Home',  component: HomeComponent  },
	{ path: '/about', name: 'About', component: AboutComponent },
	{ path: 'results/:searchTerms', component: ResultsComponent, as: 'Results' },
	{ path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {}

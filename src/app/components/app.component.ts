import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../../home/components/home.component';
import {AboutComponent} from '../../about/components/about.component';
import {ResultsComponent} from '../../results/components/results.component';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

@Component({
  	selector: 'sd-app',
  	moduleId: module.id,
  	templateUrl: './app.component.html',
  	encapsulation: ViewEncapsulation.None,
	directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, NavbarComponent, ToolbarComponent],
	providers: [MATERIAL_PROVIDERS]
})
@RouteConfig([
	{ path: '/',      name: 'Home',  component: HomeComponent  },
	{ path: '/about', name: 'About', component: AboutComponent },
	{ path: 'results/:searchTerms', component: ResultsComponent, as: 'Results' },
	{ path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {}

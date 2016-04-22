import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from "angular2/router";
import {StudentList} from "../views/studentList/studentList";
import {Constants} from "./constants";
import {SideMenu} from "../shared_components/sideMenu/sideMenu";
import {LayoutService} from "../services/layoutService";

@Component({
    selector: 'app',
    templateUrl:'app/_app/app.html',
    directives: [ROUTER_DIRECTIVES, SideMenu],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS,LayoutService]
})
@RouteConfig([
    {
        path: Constants.PATH_STUDENTS,
        name: Constants.ROUTE_STUDENTS,
        component: StudentList,
        useAsDefault: true
    }
])
export class AppComponent {
}
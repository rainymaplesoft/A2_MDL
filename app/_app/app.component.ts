import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {StudentList} from "../views/studentList/studentList";
import {Constants} from "./constants";
import {SideMenu} from "../shared_components/sideMenu/sideMenu";
import {LayoutService} from "../services/layoutService";
import {BackDrop} from "../shared_components/back-drop/backDrop";
import {HttpService} from "../data-access/httpService";
import {RainGridService} from "../shared_components/rain-grid/rainGridService";
import {LocalDataService} from "../data-access/localDataService";

@Component({
    selector: 'app',
    templateUrl: 'app/_app/app.html',
    directives: [ROUTER_DIRECTIVES, SideMenu, BackDrop],
    providers: [
        HTTP_PROVIDERS,
        //ROUTER_PROVIDERS, /* added in main.ts already, cannot added twice */
        LayoutService,
        HttpService,
        RainGridService,
        LocalDataService
    ]
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
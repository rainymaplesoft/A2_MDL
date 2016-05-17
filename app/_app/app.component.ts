import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from "@angular/http";
import 'rxjs/Rx';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {StudentList} from "../views/studentList/student-list";
import {Constants} from "./constants";
import {SideMenu} from "../shared_components/sideMenu/sideMenu";
import {LayoutService} from "../services/layout.service";
import {BackDrop} from "../shared_components/back-drop/backDrop";
import {HttpService} from "../data-access/http.service";
import {RainGridService} from "../shared_components/rain-grid/rainGridService";
import {LocalDataService} from "../data-access/local-data.service";

@Component({
    selector: 'app',
    templateUrl: 'app/_app/app.html',
    directives: [ROUTER_DIRECTIVES, SideMenu, BackDrop],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
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
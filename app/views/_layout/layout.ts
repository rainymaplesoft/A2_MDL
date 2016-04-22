import {Component} from 'angular2/core';
import {SideMenu} from "../../shared_components/sideMenu/sideMenu";
import {StudentList} from "../studentList/studentList";
import {LayoutService} from "../../services/layoutService";

@Component({
    selector: 'layout',
    templateUrl:'app/views/_layout/layout.html',
    directives: [SideMenu, StudentList],
    providers:[LayoutService]
})
export class Layout {
}
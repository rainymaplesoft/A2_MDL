import {Component} from 'angular2/core';
import {SideMenu} from "../../directives/sideMenu/sideMenu";
import {StudentList} from "../studentList/studentList";
import {MenuService} from "../../services/menuService";

@Component({
    selector: 'layout',
    templateUrl:'app/views/_layout/layout.html',
    directives: [SideMenu, StudentList],
    providers:[MenuService]
})
export class Layout {
}
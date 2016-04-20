import {Component} from 'angular2/core';
import {MenuService} from "../../services/menuService";
import {MDL} from "../../directives/mdl/mdl";

@Component({
    selector: 'student-list',
    templateUrl: 'app/views/studentList/student-list.html',
    directives: [MDL]
    //providers:[MenuService]
})
export class StudentList {
    constructor(private _menuService:MenuService) {

    }

    clickMenu():void {
        console.log(this._menuService);
        this._menuService.closeSideMenu();
    }
}
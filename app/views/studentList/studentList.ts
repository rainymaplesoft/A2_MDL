import {Component} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../../directives/mdl/mdl";

@Component({
    selector: 'student-list',
    templateUrl: 'app/views/studentList/student-list.html',
    directives: [MDL]
})
export class StudentList {
    constructor(private layoutService:LayoutService) {

    }

    clickMenu():void {
        console.log(this.layoutService);
        this.layoutService.closeSideMenu();
    }
}
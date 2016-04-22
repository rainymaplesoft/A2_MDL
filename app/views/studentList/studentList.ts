import {Component} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../../shared_components/mdl/mdl";
import {Header} from "../../shared_components/header/header";

@Component({
    selector: 'student-list',
    templateUrl: 'app/views/studentList/student-list.html',
    directives: [MDL,Header]
})
export class StudentList {
    constructor(private layoutService:LayoutService) {

    }

    toggleSideMenu():void {
        console.log(this.layoutService);
        this.layoutService.toggleSideMenu();
    }
}
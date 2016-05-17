import {Component} from '@angular/core';
import {SideMenu} from "../../shared_components/sideMenu/sideMenu";
import {StudentList} from "../studentList/student-list";
import {LayoutService} from "../../services/layout.service";

@Component({
    selector: 'layout',
    templateUrl:'app/views/_layout/layout.html',
    directives: [SideMenu, StudentList],
    providers:[LayoutService]
})
export class Layout {
}
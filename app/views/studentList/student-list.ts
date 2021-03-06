import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {LayoutService} from "../../services/layout.service";
import {MDL} from "../../shared_components/mdl/mdl";
import {Header} from "../../shared_components/header/header";
import {HttpService} from "../../data-access/http.service";
import {Student} from "../../model/student";
import {Constants} from "../../_app/constants";
import {RainGrid} from "../../shared_components/rain-grid/rainGrid";
import {IGridOptions} from "../../shared_components/rain-grid/rainGridService";

@Component({
    selector: 'student-list',
    templateUrl: 'app/views/studentList/student-list.html',
    directives: [MDL, Header, RainGrid]
})
export class StudentList implements OnInit {

    students:Student[];
    gridOptions:IGridOptions<Student>;

    constructor(private layoutService:LayoutService, private httpService:HttpService,private router: Router) {

    }

    ngOnInit():any {
        this.httpService.getList<Student>(Constants.URL_STUDENTS)
            .subscribe(students=>this.setGridOptions(students));
    }

    toggleSideMenu():void {
        console.log(this.layoutService);
        this.layoutService.toggleSideMenu();
    }

    showStudents():void {
        console.clear();
        console.log(this.students.length);
    }


    setGridOptions(students:Student[]) {
        this.gridOptions = {
            idField: "studentId",
            columnSettings: this.getColumnSetting(),
            data: students,
            enablePage: true,
            selectable: false
        };
    }
    rowSelected(id:number){
        //navigate to detail page by id
        this.router.navigate([Constants.ROUTE_STUDENT_DETAIL,{id:id}]);
console.log(id);
    }
    /*
     "studentId": "1",
     "firstName": "first",
     "lastName": "sil1st",
     "schoolName": "School A"
     */

    getColumnSetting() {
        return [
            {
                fieldName: 'studentId',
                displayName: 'Id'
            }, {
                fieldName: 'firstName',
                displayName: 'First Name',
                isLink: true
            },
            {
                fieldName: 'lastName',
                displayName: 'Last Name'
            },
            {
                fieldName: 'schoolName',
                displayName: 'School Name'
            },
            {
                fieldName: 'birthDate',
                displayName: 'Birth Date',
                isDate:true
            },
            {
                displayName: 'button',
                isButton: true,
                buttonText: 'Detail'
            }
        ];
    }
}
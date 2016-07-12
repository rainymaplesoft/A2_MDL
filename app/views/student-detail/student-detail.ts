import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RouteConfig, RouteParams,Router,ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import {MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import {MD_LIST_DIRECTIVES } from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import {LayoutService} from "../../services/layout.service";
import {Header} from "../../shared_components/header/header";
import {HttpService} from "../../data-access/http.service";
import {Student} from "../../model/student";
import {Constants} from "../../_app/constants";
import {StudentProfile} from "./student-profile";
import {StudentGroup} from "./student-group";
import {StudentObjectives} from "./student-objectives";

@Component({
    selector: 'student-detail',
    templateUrl: 'app/views/student-detail/student-detail.html',
    directives: [
        ROUTER_DIRECTIVES,
        NgForm,
        MD_TABS_DIRECTIVES,MD_SLIDE_TOGGLE_DIRECTIVES,MD_LIST_DIRECTIVES,MD_INPUT_DIRECTIVES,
        Header]
})

@RouteConfig([
    {
        path: Constants.PATH_STUDENT_PROFILE,
        name: Constants.ROUTE_STUDENT_PROFILE,
        component: StudentProfile,
        useAsDefault: true
    },
    {
        path: Constants.PATH_STUDENT_GROUP,
        name: Constants.ROUTE_STUDENT_GROUP,
        component: StudentGroup
    },
    {
        path: Constants.PATH_STUDENT_OBJECTIVES,
        name: Constants.ROUTE_STUDENT_OBJECTIVES,
        component: StudentObjectives
    }
])
export class StudentDetail implements OnInit {

     studentName:string;
    student:Student;
     studentGroups:StudentGroup[];
     backRoute = Constants.ROUTE_STUDENTS;
     show_profile: boolean;
     show_group: boolean;
     show_objectives: boolean;

    constructor(private httpService:HttpService,private router:Router,private _layoutService:LayoutService,
                private routeParams:RouteParams) {
        this._layoutService.save = this.save.bind(this);
    }

    ngOnInit() {
        this.student= new Student();
        let id = +this.routeParams.get('id');
        this.httpService.getById<Student>(Constants.URL_STUDENTS, id.toString(), 'studentId')
            .subscribe(student => {
                this.student = student;
                this.studentName = student.firstName + ' ' + student.lastName;
                console.log(student.firstName);
                this.showTab(1);
            });
        this.httpService.getList<StudentGroup>(Constants.URL_STUDENT_GROUPS)
            .subscribe(groups => {
                this.studentGroups=groups;
                console.log(this.studentGroups.length);
            });
    }

    showTab(tab: number): void {
        if (!this.student) {
            return;
        }
        this.show_profile = false;
        this.show_group = false;
        this.show_objectives = false;
        switch (tab) {
            case 1:
                this.show_profile = true;
                break;
            case 2:
                this.show_group = true;
                break;
            case 3:
                this.show_objectives = true;
                break;
        }
    }

    save():any{
        let bb = this.studentGroups;
        let aa = this.student;
    }
/*

    navigateTab(tab:number):void{
        if(!this.student){
            return;
        }
        switch (tab){
            case 1: 
                this.router.navigate([Constants.ROUTE_STUDENT_PROFILE,{student:this.student}]);
                break;
            case 2: 
                this.router.navigate([Constants.ROUTE_STUDENT_GROUP,{student:this.student}]);
                break;
            case 3: 
                this.router.navigate([Constants.ROUTE_STUDENT_OBJECTIVES,{student:this.student}]);
                break;
            default:
                this.router.navigate([Constants.ROUTE_STUDENT_PROFILE,{student:this.student}]);
        }
    }
*/

/*    goBack() {
        window.history.back();
    }*/
}
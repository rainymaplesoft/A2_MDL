import {Component, OnInit} from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import {LayoutService} from "../../services/layout.service";
import {Header} from "../../shared_components/header/header";
import {HttpService} from "../../data-access/http.service";
import {Student} from "../../model/student";
import {Constants} from "../../_app/constants";

@Component({
    selector: 'student-edit',
    templateUrl: 'app/views/student-edit/student-edit.html',
    directives: [Header]
})
export class StudentEdit implements OnInit {

    constructor(
        private httpService:HttpService,
        private routeParams: RouteParams) {
    }

    ngOnInit() {
        let id = +this.routeParams.get('id');
        this.httpService.getById<Student>(Constants.URL_STUDENTS,id.toString(),'studentId').subscribe(student=>{
            let aa= student;
        })
    }

    goBack() {
        window.history.back();
    }
}
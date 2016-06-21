import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {LayoutService} from "../../services/layout.service";
import {Header} from "../../shared_components/header/header";
import {HttpService} from "../../data-access/http.service";
import {Student} from "../../model/student";
import {Constants} from "../../_app/constants";

@Component({
    selector: 'student-detail',
    templateUrl: 'app/views/student-detail/student-detail.html',
    directives: [Header]
})
export class StudentDetail implements OnInit {

    private studentName:string;

    constructor(private httpService:HttpService,
                private routeParams:RouteParams) {
    }

    ngOnInit() {
        let id = +this.routeParams.get('id');
        this.httpService.getById<Student>(Constants.URL_STUDENTS, id.toString(), 'studentId')
            .subscribe(student => {
                this.studentName = student.firstName + ' ' + student.lastName;
                console.log(student.firstName);
            })
    }

    goBack() {
        window.history.back();
    }
}
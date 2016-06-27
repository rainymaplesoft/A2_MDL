import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Header} from "../../shared_components/header/header";
import {HttpService} from "../../data-access/http.service";
import {Student} from "../../model/student";
import {Constants} from "../../_app/constants";

@Component({
    selector: 'student-profile',
    templateUrl: 'app/views/student-detail/student-profile.html'
})
export class StudentProfile implements OnInit {

    private student:Student;

    constructor(private httpService:HttpService,
                private routeParams:RouteParams) {
        let data = this.routeParams.get('student');
        if(data && typeof data==="object"){
            this.student = <Student>data;
            console.log(this.student.firstName+' '+this.student.lastName );
        }
    }

    ngOnInit() {
    }

}
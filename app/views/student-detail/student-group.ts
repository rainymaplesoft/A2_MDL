import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Header} from "../../shared_components/header/header";
import {HttpService} from "../../data-access/http.service";
import {Student} from "../../model/student";
import {Constants} from "../../_app/constants";

@Component({
    selector: 'student-group',
    templateUrl: 'app/views/student-detail/student-group.html'
})
export class StudentGroup implements OnInit {

    private studentName:string;

    constructor(private httpService:HttpService,
                private routeParams:RouteParams) {
    }

    ngOnInit() {

    }

}
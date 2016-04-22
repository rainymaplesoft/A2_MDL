import {Component, OnInit, Input} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../mdl/mdl";
import {HideGreaterThanSmall} from "../hide-gt-sm/hideGtSm";

@Component({
    selector: 'header',
    templateUrl: 'app/shared_components/header/header.html',
    directives: [MDL,HideGreaterThanSmall]
})

export class Header implements OnInit {


    constructor(private _layoutService:LayoutService) {
    }

    ngOnInit():any {

    }
    
    toggleSideMenu():void {
        console.log(this._layoutService);
        this._layoutService.toggleSideMenu();
    }
}
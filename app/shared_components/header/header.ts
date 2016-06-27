import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {LayoutService} from "../../services/layout.service";
import {MDL} from "../mdl/mdl";
import {HideGreaterThanSmall} from "../hide-gt-sm/hideGtSm";

@Component({
    selector: 'header',
    templateUrl: 'app/shared_components/header/header.html',
    directives: [MDL,HideGreaterThanSmall]
})

export class Header implements OnInit {
    @Input() title:string;
    @Input() backRoute:string;
    
    constructor(private _layoutService:LayoutService,private router: Router) {
    }

    ngOnInit():any {

    }
    
    openSideMenu():void {
        this._layoutService.openSideMenu();
        this._layoutService.showBackDrop();
    }
    routeBack():void{
        if(this.backRoute){
            this.router.navigate([this.backRoute]);
        }
    }
}
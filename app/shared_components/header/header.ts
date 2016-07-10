import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {LayoutService, MenuAction} from "../../services/layout.service";

@Component({
    selector: 'header',
    templateUrl: 'app/shared_components/header/header.html',
    directives: []
})

export class Header implements OnInit {
    @Input() title:string;
    @Input() backRoute:string;
    @Input() menuAction:MenuAction;

    constructor(private _layoutService:LayoutService, private router:Router) {
        
    }

    ngOnInit():any {

    }

    openSideMenu():void {
        this._layoutService.openSideMenu();
        this._layoutService.showBackDrop();
    }

    routeBack():void {
        if (this.backRoute) {
            this.router.navigate([this.backRoute]);
        }
    }

    /** Actions **/
    actionSave():any {
        this._layoutService.save();
    }
}
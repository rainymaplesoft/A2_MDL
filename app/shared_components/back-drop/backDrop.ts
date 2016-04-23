import {Component, OnInit} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";

@Component({
    selector: 'back-drop',
    template: '<div class="back-drop" *ngIf="_showBackDrop" (click)="closeSideMenu()"></div>'
})

export class BackDrop implements OnInit {
    _showBackDrop:boolean;

    constructor(private layoutService:LayoutService) {

    }

    ngOnInit():any {
        this.layoutService.showBackDrop = ()=> {
            this._showBackDrop = true;
        };
        this.layoutService.closeBackDrop = ()=> {
            this._showBackDrop = false;
        }
    }

    closeSideMenu():void {
        this.layoutService.closeSideMenu();
        this._showBackDrop = false;
    }

}

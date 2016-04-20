
import {Component, OnInit, Input} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {IMenuSection} from "./sideMenu";
import {MDL} from "../mdl/mdl";
import {MenuLink} from "./menuLink";

@Component({
    selector: 'menu-toggle',
    templateUrl: 'app/directives/sideMenu/menu-toggle.html',
    directives:[MDL,MenuLink]
})

export class MenuToggle implements OnInit {

    @Input() section:IMenuSection;
    isMenuSectionOpen:boolean =false;
    
    constructor(private _layoutService:LayoutService) {
    }
    ngOnInit():any {
        return undefined;
    }

    isOpen():boolean{
        return this._layoutService.isMenuSectionOpen(this.section);
    }

    toggle():void{
        this._layoutService.toggleOpenMenuSection(this.section);
        this.isMenuSectionOpen=this._layoutService.isMenuSectionOpen(this.section);
    }
}
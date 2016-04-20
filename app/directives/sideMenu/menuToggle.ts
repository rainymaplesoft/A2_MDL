
import {Component, OnInit, Input} from 'angular2/core';
import {MenuService} from "../../services/menuService";
import {IMenuSection} from "./sideMenu";
import {MDL} from "../mdl/mdl";

@Component({
    selector: 'menu-toggle',
    templateUrl: 'app/directives/sideMenu/menu-toggle.html',
    directives:[MDL]
})

export class MenuToggle implements OnInit {

    @Input() section:IMenuSection;

    constructor(private _menuService:MenuService) {
    }
    ngOnInit():any {
        return undefined;
    }

    isOpen():boolean{
        return this._menuService.isMenuSectionOpen(this.section);
    }

    toggle():void{
        this._menuService.toggleOpen(this.section);
    }
}
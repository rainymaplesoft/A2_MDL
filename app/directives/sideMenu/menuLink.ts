import {Component, OnInit, Input} from 'angular2/core';
import {MenuService} from "../../services/menuService";
import {IMenuSection} from "./sideMenu";
import {MDL} from "../mdl/mdl";

@Component({
    selector: 'menu-link',
    templateUrl: 'app/directives/sideMenu/menu-link.html',
    directives:[MDL]
})

export class MenuLink implements OnInit {

    @Input() section:IMenuSection;

    constructor(private _menuService:MenuService) {
    }
    ngOnInit():any {
        return undefined;
    }
    selectItem(){
        
    }
}
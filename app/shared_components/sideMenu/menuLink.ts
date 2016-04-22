import {Component, OnInit, Input} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {IMenuSection} from "./sideMenu";
import {MDL} from "../mdl/mdl";

@Component({
    selector: 'menu-link',
    templateUrl: 'app/shared_components/sideMenu/menu-link.html',
    directives:[MDL]
})

export class MenuLink implements OnInit {

    @Input() section:IMenuSection;

    constructor(private _layoutService:LayoutService) {
    }
    ngOnInit():any {
        return undefined;
    }
    selectItem(){
        
    }
}
import {Injectable} from 'angular2/core';
import {IMenuSection} from "../directives/sideMenu/sideMenu";

@Injectable()
export class MenuService {
    isLockedOpen:boolean;
    isOpen:boolean;
    openedMenuSection:IMenuSection;

    closeSideMenu():void {
    }

    openSideMenu():void {
    }

    isMenuSectionOpen(section:IMenuSection):boolean {
        return this.openedMenuSection === section;
    }
    
    toggleOpen(section:IMenuSection):void {
        this.openedMenuSection = this.openedMenuSection === section ? null : section;
    }
}

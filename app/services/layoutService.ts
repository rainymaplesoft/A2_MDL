import {Injectable} from 'angular2/core';
import {IMenuSection} from "../shared_components/sideMenu/sideMenu";

@Injectable()
export class LayoutService {
    isSideMenuLockedOpen:boolean;
    openedMenuSection:IMenuSection;

    toggleSideMenu():void {
        // implemented in Class SideMenu 
    }

    openSideMenu():void {
    }

    isMenuSectionOpen(section:IMenuSection):boolean {
        return this.openedMenuSection === section;
    }
    
    toggleOpenMenuSection(section:IMenuSection):void {
        this.openedMenuSection = this.openedMenuSection === section ? null : section;
    }
}

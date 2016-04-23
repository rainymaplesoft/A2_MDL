import {Injectable} from 'angular2/core';
import {IMenuSection} from "../shared_components/sideMenu/sideMenu";

@Injectable()
export class LayoutService {
    isSideMenuLockedOpen:boolean;
    openedMenuSection:IMenuSection;

    toggleSideMenu():void {
        // implemented in Class SideMenu 
    }
    
    closeSideMenu():void {
        // implemented in Class SideMenu 
    }
    
    openSideMenu():void {
        // implemented in Class SideMenu 
    }

    showBackDrop():void{
        // implemented in Class BackDrop 
    }

    closeBackDrop():void{
        // implemented in Class BackDrop 
    }

    isMenuSectionOpen(section:IMenuSection):boolean {
        return this.openedMenuSection === section;
    }
    
    toggleMenuSection(section:IMenuSection):void {
        this.openedMenuSection = this.openedMenuSection === section ? null : section;
    }
    
}

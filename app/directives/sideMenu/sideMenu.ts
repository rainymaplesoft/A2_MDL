import {Component, OnInit, OnChanges} from 'angular2/core';
import {MenuService} from "../../services/menuService";
import {MenuLink} from "./menuLink";
import {MenuToggle} from "./menuToggle";

export interface IMenuSection {
    name:string,
    state:string,
    type:string,
    pages?:IMenuSection[],
    icon?:string
}

@Component({
    selector: 'side-menu',
    templateUrl: 'app/directives/sideMenu/side-menu.html',
    directives:[MenuLink,MenuToggle]
})

export class SideMenu implements OnInit,OnChanges {
    constructor(private _menuService:MenuService) {
    }

    sideMenuWidth:number = 320;
    menuTitle:string = 'Side Menu Toolbar';
    isHideSideMenu:boolean = false;
    selectedMenuSection:IMenuSection;
    menu:IMenuSection[] = this.GetMenuSections();

    ngOnInit():any {
        this._menuService.isLockedOpen = true;
        this._menuService.closeSideMenu = ()=> {
            this.sideMenuWidth = this.sideMenuWidth === 0 ? 320 : 0;
            this.isHideSideMenu = !this.isHideSideMenu;
        }
    }

    ngOnChanges(changes:{}):any {
        return undefined;
    }

    isSectionSelected(section:IMenuSection):boolean{
        return section ===this.selectedMenuSection;
    }


    public GetMenuSections():IMenuSection[] {
        return [
            {
                name: 'Get Started',
                state: '',
                type: 'link',
            },
            {
                name: 'Data Collection',
                state: '',
                type: 'toggle',
                pages: [
                    {
                        name: 'DC 01',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'DC 02',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'DC 03',
                        state: '',
                        type: 'link',
                    }
                ]
            },
            {
                name: 'Student Management',
                state: '',
                type: 'toggle',
                pages: [
                    {
                        name: 'Student List',
                        state: 'student_list',
                        type: 'link',
                    },
                    {
                        name: 'Student Group',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'Student 03',
                        state: '',
                        type: 'link',
                    }
                ]
            },
            {
                name: 'Report',
                state: '',
                type: 'toggle',
                pages: [
                    {
                        name: 'Central/School',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'Teach Classroom',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'Parent/Student',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'Monthly Verification',
                        state: '',
                        type: 'link',
                    },
                    {
                        name: 'Data Collection',
                        state: '',
                        type: 'link',
                    }
                ]
            },
            {
                name: 'Offline',
                state: '',
                type: 'link',
            },
            {
                name: 'Settings',
                state: '',
                type: 'link',
            }

        ];
    }
}

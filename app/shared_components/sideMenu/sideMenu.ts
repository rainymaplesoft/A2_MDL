import {Component, OnInit, OnChanges} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
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
    templateUrl: 'app/shared_components/sideMenu/side-menu.html',
    directives: [MenuLink, MenuToggle]
})

export class SideMenu implements OnInit,OnChanges {
    constructor(private layoutService:LayoutService) {
    }

    sideMenuWidth:number = 320;
    menuTitle:string = 'Angular 2 with MDL';
    isHideSideMenu:boolean = true;
    menu:IMenuSection[] = this.GetMenuSections();

    ngOnInit():any {
        this.layoutService.isSideMenuLockedOpen = true;
        this.layoutService.toggleSideMenu = ()=> {
            this.sideMenuWidth = this.sideMenuWidth === 0 ? 320 : 0;
            this.isHideSideMenu = !this.isHideSideMenu;
        };
        this.layoutService.closeSideMenu = ()=> {
            this.isHideSideMenu = true
        };
        this.layoutService.openSideMenu = ()=> {
            this.isHideSideMenu = false
        };
    }

    ngOnChanges(changes:{}):any {
        return undefined;
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

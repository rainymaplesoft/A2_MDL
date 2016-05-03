import {Component, OnInit,OnChanges, Input, Output,EventEmitter} from '@angular/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../mdl/mdl";


export interface IGridField {
    fieldName: string;
    displayName: string;
    value?:any;
    id?:string;
    isDate?:boolean;
    isCurrency?:boolean;
    isNumber?:boolean;
    isCheckbox?:boolean;
    isLink?:boolean;
    isButton?:boolean;
    isIcon?:boolean;
    isHidden?:boolean;
    decimal?:number;
    linkEvent?:string;
}

@Component({
    selector: 'grid-cell',
    templateUrl: 'app/shared_components/rain-grid/rain-grid-cell.html',
    directives: [MDL]
})

export class RainGridCell implements OnInit,OnChanges {

    @Input() grid_field:IGridField;
    @Input() value:any;
    @Output() cellClicked: EventEmitter<string>= new EventEmitter<string>();
    
    constructor(private _layoutService:LayoutService) {
    }

    ngOnInit():any {

    }

    ngOnChanges(changes:{}):any {
        return undefined;
    }

    onClick():void{
        this.cellClicked.emit(JSON.stringify(this.value));
    }

}

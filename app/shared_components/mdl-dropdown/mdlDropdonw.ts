
import {Component, Input, OnInit, OnChanges, Output, EventEmitter, ElementRef} from "@angular/core";
import {MDL} from "../mdl/mdl";

export interface IKeyValuePair{
    label:string,
    value:string
}
@Component({
    selector:'mdl-drop-down',
    templateUrl: 'app/shared_components/mdl-dropdown/mdl-dropdown.html',
    directives:[MDL]
})
export class MdlDropDown implements OnInit,OnChanges{
    @Input() selected_option:IKeyValuePair;
    @Input() options:IKeyValuePair[];
    @Output() optionChanged:EventEmitter<IKeyValuePair> = new EventEmitter<IKeyValuePair>();

    _el:ElementRef;
    constructor(el: ElementRef) {
        this._el = el;
    }
    ngOnInit():any {
        //this.selected_option = null;
    }

    ngOnChanges(changes:{}):any {
        return undefined;
    }

    changeOption(option:IKeyValuePair){
        this._el.nativeElement.click();
        this.selected_option = option;
        this.optionChanged.emit(option);
    }
}

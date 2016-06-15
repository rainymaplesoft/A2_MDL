import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {IGridField} from "./rainGridService";
import {PolymerElement} from '@vaadin/polymer-element';


@Component({
    selector: 'grid-cell',
    templateUrl: 'app/shared_components/rain-grid/rain-grid-cell.html',
    directives: [PolymerElement('paper-button')]
})

export class RainGridCell implements OnInit,OnChanges {

    @Input() grid_field:IGridField;
    @Input() value:any;
    @Output() cellClicked:EventEmitter<string> = new EventEmitter<string>();

    constructor(private _layoutService:LayoutService) {
    }

    ngOnInit():any {

    }

    ngOnChanges(changes:{}):any {
        return undefined;
    }

    onClick(id:number):void {
        this.cellClicked.emit(JSON.stringify(this.value));
        console.log('cell button clicked, id = ' + id);
    }

}

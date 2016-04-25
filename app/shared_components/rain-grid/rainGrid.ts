import {Component, OnInit,OnChanges, Input, Output,EventEmitter} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../mdl/mdl";
import {IGridField, RainGridCell} from "./rainGridCell";

export interface IGridOptions<T> {
    columnSettings:Array<IGridField>,
    idField:string,
    data?:T[],
    selectable?:boolean,
    selectFirstRow?:boolean,
    showToolMenu?:boolean,
    enablePage?:boolean,
    pageSize?:number
}

export interface IGridHeader {
    fieldName:string,
    displayName:string,
    isHidden:boolean
}

export interface IGridRow {
    fields: IGridField[], rowSelected: boolean, idField: string, id: string
}

@Component({
    selector: 'rain-grid',
    templateUrl: 'app/shared_components/rain-grid/rain-grid.html',
    directives: [MDL,RainGridCell]
})

export class RainGrid<T> implements OnInit,OnChanges {

    @Input() grid_options:IGridOptions<T>;
    @Input() value:any;
    @Output() cellClicked: EventEmitter<string>= new EventEmitter<string>();

    header:IGridHeader[];
    dataList:IGridRow[];

    constructor(private _layoutService:LayoutService) {
    }

    ngOnInit():any {

    }

    ngOnChanges(changes:{}):any {
        if(!this.grid_options||!this.grid_options.columnSettings){
            return;
        }
        this.header= this.buildHeader(this.grid_options.columnSettings);
        this.dataList = this.buildGridData(this.grid_options);
    }

    sortingChanged(fieldName:string):void{

    }

    selectRow(row:IGridRow):void{

    }
    onClick():void{
        this.cellClicked.emit(JSON.stringify(this.value));
    }


    buildHeader(columnSettings:Array<IGridField>):Array<IGridHeader> {
        var row = [];
        for(let col of columnSettings){
            row.push({
                fieldName: col.fieldName,
                displayName: col.displayName,
                isHidden: col.isHidden||false
            });
        }
        return row;
    }   // end of buildHeader

    buildGridData(gridOptions:IGridOptions<T>):IGridRow[] {
        let dataList = gridOptions.data;
        let columnSettings = gridOptions.columnSettings;
        let idField = null;
        let id = null;


        let gridList = [];
        if (dataList.length == 0) {
            return gridList;
        }
        for (let rowData of dataList){
            let fields:Array<IGridField> = [];
            if (!columnSettings) {
                for (let property in rowData) {
                    if (rowData.hasOwnProperty(property)) {
                        fields.push(
                            {
                                fieldName: property,
                                value: rowData[property],
                                displayName: property
                            });
                    }
                }
            }else {
                idField = gridOptions.idField;
                if (idField) {
                    id = rowData[gridOptions.idField];
                }
                for (let col of columnSettings) {
                    let field:IGridField = {
                        id: rowData[gridOptions.idField],
                        fieldName: col.fieldName,
                        value: (rowData[col.fieldName] === null || rowData[col.fieldName] === undefined)
                            ? '' : rowData[col.fieldName],
                        displayName: col.displayName,
                        isCheckbox: col.isCheckbox,
                        isCurrency: col.isCurrency,
                        isNumber: col.isNumber,
                        decimal: col.decimal,
                        isLink: col.isLink,
                        isButton: col.isButton,
                        isIcon: col.isIcon,
                        isDate: col.isDate,
                        isHidden: col.isHidden || false
                    };
                    fields.push(field);
                }
            }
            let gridRow:IGridRow = {fields: fields, rowSelected: false, idField: idField, id: id};
            gridList.push(gridRow);
        }

        if (gridOptions.selectFirstRow && gridList.length > 0) {
            gridList[0].rowSelected = true;
        }

        return gridList;
    }   // end of buildGridData
}

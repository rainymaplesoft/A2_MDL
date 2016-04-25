import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
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
    fields:IGridField[], rowSelected:boolean, idField:string, id:string
}

export enum SortingOptions {NONE, ASC, DSC}

@Component({
    selector: 'rain-grid',
    templateUrl: 'app/shared_components/rain-grid/rain-grid.html',
    directives: [MDL, RainGridCell]
})

export class RainGrid<T> implements OnInit,OnChanges {

    @Input() grid_options:IGridOptions<T>;
    @Input() value:any;
    @Output() cellClicked:EventEmitter<string> = new EventEmitter<string>();

    header:IGridHeader[];
    dataList:IGridRow[];
    dataListOrigin:IGridRow[];
    private _enablePaging:boolean = true;
    private _selectedRow:IGridRow = null;
    private _currentSortIndex:number = 0;
    private _currentSortField:string = null;
    private _isFiltered:boolean = false;
    private _dataRowsFiltered = [];

    constructor(private _layoutService:LayoutService) {
    }

    ngOnInit():any {

    }

    ngOnChanges(changes:{}):any {
        if (!this.grid_options || !this.grid_options.columnSettings) {
            return;
        }
        this.header = this.buildHeader(this.grid_options.columnSettings);
        this.dataListOrigin = this.buildGridData(this.grid_options);
        this.dataList = this.getPageData();
    }

    selectRow(row:IGridRow):void {

    }

    onClick():void {
        this.cellClicked.emit(JSON.stringify(this.value));
    }


    buildHeader(columnSettings:Array<IGridField>):Array<IGridHeader> {
        var row = [];
        for (let col of columnSettings) {
            row.push({
                fieldName: col.fieldName,
                displayName: col.displayName,
                isHidden: col.isHidden || false
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
        for (let rowData of dataList) {
            let fields:Array<IGridField> = [];
            if (!columnSettings) {
                for (let property in rowData) {
                    if (rowData.hasOwnProperty(property)) {
                        fields.push(
                            {
                                fieldName: property,
                                value: rowData[property],
                                displayName: property,
                                isHidden: false
                            });
                    }
                }
            } else {
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


    /*-- Sorting --*/

    sortingChanged(fieldName:string):void {
        console.log(fieldName);
        var sortingOption = SortingOptions.NONE;
        if (this._currentSortField !== fieldName) {
            this._currentSortIndex = 1;
            sortingOption = SortingOptions.ASC;
        } else {
            this._currentSortIndex = this._currentSortIndex + 1;
            sortingOption = SortingOptions.DSC;
            if (this._currentSortIndex > 2) {
                this._currentSortIndex = 0;
                sortingOption = SortingOptions.NONE;
            }
        }
        this._currentSortField = fieldName;

        var rows = this._isFiltered ? this._dataRowsFiltered : this.dataListOrigin;
        this.dataList = this.sortData(rows, this._currentSortField, sortingOption);
        //this.getPageData();
    }


    sortData(dataList:Array<IGridRow>, sortField:string, sortOrder:SortingOptions):Array<IGridRow> {

        if (!sortField || sortOrder === SortingOptions.NONE) {
            return dataList;
        }
        var sortedData = _.sortBy(dataList, function (row:IGridRow) {
            var rowData = row.fields;
            var sortedValue = null;
            for (var i = 0; i < rowData.length; i++) {
                if (rowData[i].fieldName === sortField) {
                    sortedValue = rowData[i].value;
                    return sortedValue;
                }
            }
        });
        return sortOrder === SortingOptions.ASC ? sortedData : sortedData.reverse();
    }   // end of sortData

    /* -- paging -- */

    getPageData():Array<IGridRow> {
        var self = this;
        if (!this._enablePaging) {
            return this.dataListOrigin.slice(0);
        }
        var pagedDataList = this.getDataListByPage(1,20);

        if (pagedDataList) {
            for(let row of pagedDataList){
                if (row.rowSelected) {
                    if (row !== self._selectedRow) {
                        row.rowSelected = false;
                    }
                }
            }
        }
        return pagedDataList;
    }

    getDataListByPage( page:number, pageSize:number):Array<IGridRow> {
        // page starts with 1
        if (!this.dataListOrigin || page <= 0) {
            return null;
        }
        try {
            //dataList = sortData(dataList);

            var start = (page - 1) * pageSize;
            var pagedData = _.slice(this.dataListOrigin, start, start + pageSize);
            if (!pagedData) {
                return null;
            }
            return pagedData;
        } catch (e) {
            console.log(e.message);
            return null;
        }
    }
}

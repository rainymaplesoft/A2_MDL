import {Injectable} from "@angular/core";
import {LocalDataService} from "../../data-access/local-data.service";


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

export interface IGridField {
    displayName:string;
    fieldName?:string;
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
    buttonText?:string;
}

export enum SortingOptions {NONE, ASC, DSC}

export class PageSize {
    label:string;
    value:number
}

@Injectable()

export class RainGridService<T> {

    private _sortedData:IGridRow[];

    constructor(private local:LocalDataService) {

    }

    getPageSizeOptions():PageSize[] {
        return [
            {label: ' 5', value: 5},
            {label: '10', value: 10},
            {label: '15', value: 15},
            {label: '20', value: 20},
            {label: '30', value: 30}
        ];
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
                        buttonText: col.buttonText,
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
                    if (col.isDate) {
                        try {
                            field.value = new Date(field.value);
                        } catch (e) {
                            field.value = null;
                        }

                    }
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


    getDataListByPage(dataList:IGridRow[], page:number, pageSize:number):Array<IGridRow> {
        // page starts with 1
        if (!dataList || page <= 0) {
            return null;
        }
        try {
            //dataList = sortData(dataList);

            var start = (page - 1) * pageSize;
            var pagedData = _.slice(dataList, start, start + pageSize);
            if (!pagedData) {
                return null;
            }
            return pagedData;
        } catch (e) {
            console.log(e.message);
            return null;
        }
    }

    sortData(dataList:Array<IGridRow>, sortField:string, sortOrder:SortingOptions):Array<IGridRow> {

        if (!sortField || sortOrder === SortingOptions.NONE) {
            return dataList;
        }

        this._sortedData = _.sortBy(dataList, function (row:IGridRow) {
            var rowData = row.fields;
            var sortedValue = null;
            for (var i = 0; i < rowData.length; i++) {
                if (rowData[i].fieldName === sortField) {
                    sortedValue = rowData[i].value;
                    return sortedValue;
                }
            }
        });

        return (sortOrder === SortingOptions.ASC) ? this._sortedData : this._sortedData.reverse();
    }   // end of sortData
}


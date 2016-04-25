import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../mdl/mdl";
import {RainGridCell} from "./rainGridCell";
import {RainGridService, IGridOptions, IGridHeader, IGridRow, PageSize, SortingOptions} from "./rainGridService";


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
    currentSortField:string = null;
    currentSortOrder:string;
    private _enablePaging:boolean = true;
    private _selectedRow:IGridRow = null;
    private _currentSortIndex:number = 0;
    private _sortingOptions = [null, 'ASC', 'DSC'];
    private _currentPage:number = 1;
    private _pageSize:number;
    private _pageSizeOptions:PageSize[];
    private _isFiltered:boolean = false;
    private _dataRowsFiltered = [];

    constructor(private _gridService:RainGridService<T>, private _layoutService:LayoutService) {
    }

    ngOnInit():any {
        this._pageSizeOptions = this._gridService.getPageSizeOptions();
        this._pageSize = 20;
    }

    ngOnChanges(changes:{}):any {
        if (!this.grid_options || !this.grid_options.columnSettings) {
            return;
        }
        this.header = this._gridService.buildHeader(this.grid_options.columnSettings);
        this.dataListOrigin = this._gridService.buildGridData(this.grid_options);
        this.dataList = this.getPageData(this.dataListOrigin);
    }

    selectRow(row:IGridRow):void {

    }

    onClick():void {
        this.cellClicked.emit(JSON.stringify(this.value));
    }


    /*-- Sorting --*/

    sortingChanged(fieldName:string):void {
        console.log(fieldName);
        var sortingOption = SortingOptions.NONE;
        if (this.currentSortField !== fieldName) {
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
        this.currentSortOrder = this._sortingOptions[this._currentSortIndex];
        this.currentSortField = !!this.currentSortOrder ? fieldName : null;

        var rows = this._isFiltered ? this._dataRowsFiltered : this.dataListOrigin;
        let sortedDataList = this._gridService.sortData(rows, this.currentSortField, sortingOption);
        this.dataList = this.getPageData(sortedDataList);
    }


    /* -- paging -- */

    getPageData(data:IGridRow[]):Array<IGridRow> {
        var self = this;
        if (!this._enablePaging) {
            return data.slice(0);
        }
        var pagedDataList = this._gridService.getDataListByPage(data, this._currentPage, this._pageSize);

        if (pagedDataList) {
            for (let row of pagedDataList) {
                if (row.rowSelected) {
                    if (row !== self._selectedRow) {
                        row.rowSelected = false;
                    }
                }
            }
        }
        return pagedDataList;
    }

}

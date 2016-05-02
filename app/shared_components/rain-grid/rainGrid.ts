import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {MDL} from "../mdl/mdl";
import {RainGridCell} from "./rainGridCell";
import {RainGridService, IGridOptions, IGridHeader, IGridRow, SortingOptions} from "./rainGridService";
import {RainGridPagination} from "./rainGridPage";


@Component({
    selector: 'rain-grid',
    templateUrl: 'app/shared_components/rain-grid/rain-grid.html',
    directives: [MDL, RainGridCell, RainGridPagination]
})

export class RainGrid<T> implements OnInit,OnChanges {

    @Input() grid_options:IGridOptions<T>;
    @Input() value:any;
    @Output() cellClicked:EventEmitter<string> = new EventEmitter<string>();
    @Output() onRowSelected:EventEmitter<string> = new EventEmitter<string>();

    header:IGridHeader[];
    dataList:IGridRow[];
    pagedDataList:IGridRow[];
    dataListOrigin:IGridRow[];
    currentSortField:string = null;
    currentSortOrder:SortingOptions = SortingOptions.NONE;
    pageSize:number;
    recordCount:number;
    currentPage:number = 1;
    private _enablePaging:boolean = true;
    private _selectedRow:IGridRow = null;

    constructor(private _gridService:RainGridService<T>) {
    }

    ngOnInit():any {
        //this._pageSizeOptions = this._gridService.getPageSizeOptions();
        this.pageSize = 10;
    }

    ngOnChanges(changes:{}):any {

        if (!this.grid_options || !this.grid_options.columnSettings) {
            return;
        }

        this.header = this._gridService.buildHeader(this.grid_options.columnSettings);
        this.dataListOrigin = this._gridService.buildGridData(this.grid_options);
        this.recordCount = this.dataListOrigin.length;
        this.dataList = this.dataListOrigin.slice(0);
        this.getPageData();
    }

    selectRow(row:IGridRow):void {
        if (!this.grid_options.selectable) {
            return;
        }
        var isSelected = row.rowSelected;
        for (let _row of this.dataList) {
            _row.rowSelected = false;
        }

        row.rowSelected = !isSelected;
        if (row.rowSelected) {
            this._selectedRow = row;
            this.onRowSelected.emit(row.idField);
        }
    }

    onClick():void {
        this.cellClicked.emit(JSON.stringify(this.value));
    }

    onPageSizeChanged(pageSize:number) {
        this.pageSize = pageSize;
        this.getPageData();
    }

    onPageChanged(currentPage:number) {
        this.currentPage = currentPage;
        this.getPageData();
    }

    /*-- Sorting --*/

    onSortingChanged(fieldName:string):void {
        if (this.currentSortField !== fieldName) {
            this.currentSortOrder = SortingOptions.ASC;
        } else {
            if (this.currentSortOrder === SortingOptions.ASC) {
                this.currentSortOrder = SortingOptions.DSC;
            } else {
                if (this.currentSortOrder === SortingOptions.DSC) {
                    this.currentSortOrder = SortingOptions.NONE;
                } else {
                    this.currentSortOrder = SortingOptions.ASC;
                }
            }
        }
        this.currentSortField = (this.currentSortOrder !== SortingOptions.NONE) ? fieldName : null;
        this.currentPage = 1;

        // get page data
        this.dataList = this._gridService.sortData(this.dataListOrigin, this.currentSortField, this.currentSortOrder);
        this.getPageData();
    }


    /* -- paging -- */

    getPageData():Array<IGridRow> {
        var self = this;

        if (!this._enablePaging) {
            this.pagedDataList = this.dataList;
            return;
        }

        this.pagedDataList = this._gridService.getDataListByPage(this.dataList, this.currentPage, this.pageSize);

        for (let row of this.pagedDataList) {
            if (row.rowSelected && row !== self._selectedRow) {
                row.rowSelected = false;
            }
        }
    }

}

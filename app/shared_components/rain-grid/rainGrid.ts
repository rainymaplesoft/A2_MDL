import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from 'angular2/core';
import {LayoutService} from "../../services/layoutService";
import {MDL} from "../mdl/mdl";
import {RainGridCell} from "./rainGridCell";
import {RainGridService, IGridOptions, IGridHeader, IGridRow, PageSize, SortingOptions} from "./rainGridService";
import {RainGridPagination} from "./rainGridPage";
import {LocalDataService} from "../../data-access/localDataService";


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
    dataListOrigin:IGridRow[];
    currentSortField:string = null;
    currentSortOrder:SortingOptions = SortingOptions.NONE;
    pageSize:number;
    recordCount:number;
    currentPage:number = 1;
    private _enablePaging:boolean = true;
    private _selectedRow:IGridRow = null;
    private _gridDataId:string = '';
    private _isFiltered:boolean = false;
    private _dataRowsFiltered = [];

    constructor(private _gridService:RainGridService<T>, private local:LocalDataService) {
    }

    ngOnInit():any {
        //this._pageSizeOptions = this._gridService.getPageSizeOptions();
        this.pageSize = 10;
    }

    ngOnChanges(changes:{}):any {
        if (!this.grid_options || !this.grid_options.columnSettings) {
            return;
        }
        this._gridDataId = this.grid_options.idField + this.grid_options.columnSettings.length.toString();
        this.local.RemoveItem(this._gridDataId);

        this.header = this._gridService.buildHeader(this.grid_options.columnSettings);
        this.dataListOrigin = this._gridService.buildGridData(this.grid_options);
        this.recordCount = this.dataListOrigin.length;
        this.dataList = this.getPageData(this.dataListOrigin);
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
        this.dataList = this.getPageData(this.dataListOrigin);
    }

    onPageChanged(currentPage:number) {
        this.currentPage = currentPage;
        this.dataList = this.getPageData(this.dataListOrigin);
    }

    /*-- Sorting --*/

    sortingChanged(fieldName:string):void {
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
        this.dataList = this.getPageData(this.dataListOrigin);
    }


    /* -- paging -- */

    getPageData(data:IGridRow[]):Array<IGridRow> {
        var self = this;

        // apply sorting
        let sortedDataList = this._gridService.sortData(
            data, this.currentSortField, this.currentSortOrder, this._gridDataId);

        if (!this._enablePaging) {
            return sortedDataList;
        }

        // apply paging
        var pagedDataList = this._gridService.getDataListByPage(sortedDataList, this.currentPage, this.pageSize);

        if (pagedDataList) {
            for (let row of pagedDataList) {
                if (row.rowSelected && row !== self._selectedRow) {
                    row.rowSelected = false;
                }
            }
        }
        return pagedDataList;
    }

}

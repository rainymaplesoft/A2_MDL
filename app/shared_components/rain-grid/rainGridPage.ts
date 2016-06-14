import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from "@angular/core";
import {MDL} from "../mdl/mdl";
import {MdlDropDown} from "../mdl-dropdown/mdlDropdonw";
import {PolymerElement} from '@vaadin/angular2-polymer/src/polymer-element';
import {IKeyValuePair, ISelectedItem} from "../../_app/constants";

export enum SelectPage {First, Previous, Next, End}

@Component({
    selector: 'rain-grid-page',
    templateUrl: 'app/shared_components/rain-grid/rain-grid-page.html',
    directives: [MDL, MdlDropDown, PolymerElement('vaadin-combo-box')]
})
export class RainGridPagination implements OnInit,OnChanges {
    @Input() page_size:number;
    @Input() recordCount:number;
    @Input() currentPage:number;
    @Output() pageSizeChanged:EventEmitter<number> = new EventEmitter<number>();
    @Output() pageChanged:EventEmitter<number> = new EventEmitter<number>();

    pageOptions:IKeyValuePair[];
    selected_option:IKeyValuePair;
    private _pageSize:number;
    private _currentPage:number = 1;
    private _totalPages:number;
    disableStart:boolean;
    disablePrevious:boolean;
    disableNext:boolean;
    disableEnd:boolean;

    ngOnInit():any {
        this.pageOptions = [
            {label: 'five', value: 5},
            {label: '10', value: 10},
            {label: '20', value: 20},
            {label: '30', value: 30},
        ];
        if (!this.page_size || this.page_size > 5 && this.page_size <= 10) {
            this._pageSize = 10;
        }
        if (this.page_size <= 5) {
            this._pageSize = 5;
        }
        if (this.page_size > 10 && this.page_size <= 20) {
            this._pageSize = 20;
        }
        if (this.page_size >= 30) {
            this._pageSize = 30;
        }
        let pageSize = this._pageSize;
        for (let option of this.pageOptions) {
            if (pageSize === option.value) {
                this.selected_option = option;
                break;
            }
        }
        this.setPageButton();
    }

    ngOnChanges(changes:{}):any {
        this._currentPage = this.currentPage;
        this.setPageButton();
    }

    changeSize(pageSize:ISelectedItem) {
        if(isNaN(pageSize.detail.value)){
            return;
        }
        this._pageSize = pageSize.detail.value;//+pageSizeOption.value;
        this.pageSizeChanged.emit(this._pageSize);
    }

    changePage(selected:SelectPage) {
        this._totalPages = Math.ceil(this.recordCount / this._pageSize);
        let currentPage = 1;
        switch (selected) {
            case SelectPage.First:
                currentPage = 1;
                break;
            case SelectPage.Previous:
                currentPage = this._currentPage - 1;
                if (currentPage <= 0) {
                    currentPage = 1;
                }
                break;
            case SelectPage.Next:
                currentPage = this._currentPage + 1;
                if (currentPage > this._totalPages) {
                    currentPage = this._currentPage;
                }
                break;
            case SelectPage.End:
                currentPage = this._totalPages;
                break;
        }
        if (currentPage === this._currentPage) {
            return;
        }
        this._currentPage = currentPage;
        this.pageChanged.emit(currentPage);
        this.setPageButton();
    }

    private setPageButton():void {
        this._totalPages = Math.ceil(this.recordCount / this._pageSize);
        if (1 === this._totalPages) {
            this.disableStart = this.disablePrevious = this.disableNext = this.disableEnd = true;
            return;
        }
        this.disableStart = this.disablePrevious = (this._currentPage === 1);

        this.disableNext = this.disableEnd = (this._currentPage === this._totalPages);

    }
}

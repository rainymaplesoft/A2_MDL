import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from "angular2/core";
import {MDL} from "../mdl/mdl";
import {IKeyValuePair, MdlDropDown} from "../mdl-dropdown/mdlDropdonw";
@Component({
    selector: 'rain-grid-page',
    templateUrl: 'app/shared_components/rain-grid/rain-grid-page.html',
    directives: [MDL,MdlDropDown]
})
export class RainGridPagination implements OnInit,OnChanges {
    @Input() page_size:number;
    @Output() pageSizeChanged:EventEmitter<number> = new EventEmitter<number>();

    pageOptions:IKeyValuePair[];
    selected_option:IKeyValuePair;

    ngOnInit():any {
        this.pageOptions = [
            {label: ' 5', value: '5'},
            {label: '10', value: '10'},
            {label: '20', value: '20'},
            {label: '30', value: '30'},
        ];
        let pageSize=""+this.page_size;
        for(let option of this.pageOptions){
            if(pageSize ===  option.value){
                this.selected_option = option;
                break;
            }
        }
    }

    ngOnChanges(changes:{}):any {
        return undefined;
    }

    changeSize(pageSizeOption:IKeyValuePair) {
        this.page_size = +pageSizeOption.value;
        this.pageSizeChanged.emit(this.page_size);
    }
}

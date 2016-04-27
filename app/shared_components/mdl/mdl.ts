import {Directive, AfterViewInit, ElementRef} from 'angular2/core';
declare var componentHandler;

@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewInit {
    _el:ElementRef;
    constructor(el: ElementRef) {
        this._el = el;
        componentHandler.upgradeElement(el.nativeElement);
    }
    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
        //componentHandler.upgradeElement(this._el);
    }
}
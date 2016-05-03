import {Directive, ElementRef} from '@angular/core';
@Directive({
    selector: '[hide-gt-sm]'
})
export class HideGreaterThanSmall {
    constructor(el: ElementRef) {
        //el.nativeElement.style.display = 'none';
    }
}
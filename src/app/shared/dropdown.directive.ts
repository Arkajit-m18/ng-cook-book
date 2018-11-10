import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') click() {
        this.isOpen = !this.isOpen;

        // if (this.isOpen) {
        //     this.renderer.addClass(this.elementRef.nativeElement, 'open');
        // } else {
        //     this.renderer.removeClass(this.elementRef.nativeElement, 'open');
        // }
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    }
}
import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[spAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  ngAfterViewInit(): void {
    if (this.elementRef.nativeElement instanceof HTMLInputElement) {
      this.elementRef.nativeElement.focus();
    }
  }

  constructor(private elementRef: ElementRef) {
    console.log('Directive spAutofocus');
  }

}

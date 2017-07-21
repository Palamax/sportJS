import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

export const CLICK_OUTSIDE = "clickOutside";

@Component({
  selector: 'sp-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent implements OnInit  {

  @ViewChild('popin') popinPartieBlanche: ElementRef;
  @Output() exit = new EventEmitter<void>();

  constructor(private renderer: Renderer2, private popinComplete: ElementRef) { }

  ngOnInit() {
    this.renderer.listen(this.popinPartieBlanche.nativeElement, 'click', e => {e.stopPropagation()});
    this.renderer.listen(this.popinComplete.nativeElement, 'click', e => this.exit.emit(CLICK_OUTSIDE));
    this.renderer.listen(document, 'keydown.Escape', e => this.exit.emit(CLICK_OUTSIDE));
  }

}

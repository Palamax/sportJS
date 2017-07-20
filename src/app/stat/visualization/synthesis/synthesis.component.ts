import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecordStoreService} from "../../record-store.service";
import {Observable} from "rxjs/Observable";
import {Record} from "../../../shared/record/record";
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/max'
import 'rxjs/add/operator/min'
import 'rxjs/add/operator/last'
import 'rxjs/add/observable/from'
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'sp-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.scss']
})
export class SynthesisComponent implements OnInit, OnDestroy {

  record$: Observable<Record>;

  //destroyObservable = new Subject<void>();

  constructor(private recordStoreService: RecordStoreService) { }

  ngOnInit() {
    this.record$ = this.recordStoreService.getSelectedRecord$();
    //this.record$.subscribe(val => console.log(val));
    //this.getType$().subscribe(val => console.log(val));
    //this.getDuration$().subscribe(val => console.log(val));
    //this.getMax$().subscribe(val => console.log(val));
    //this.getMin$().subscribe(val => console.log(val));
   // this.record$.takeUntil(this.destroyObservable).subscribe(val => console.log(val));
  }

  ngOnDestroy(): void {
    //this.destroyObservable.next();
    //this.destroyObservable.complete();
  }

  getType$(): Observable<string> {
    return this.record$.filter(record => !!record).map(record => record.type);
  }

  getDuration$(): Observable<any> {
    return this.record$.filter(record => !!record)
      .map(record => record.heartBeats)
      .map(h => h[h.length-1])
      .map(h => h.x + 1)
      .map(x => `${Math.floor(x/60)}''${x%60}'`);
  }

  getMax$(): Observable<number> {
    return this.record$
      .filter(record => !!record)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(record => record.y)
        .max());
  }

  getMin$(): Observable<number> {
    return this.record$
      .filter(record => !!record)
      .mergeMap(record => Observable.from(record.heartBeats)
        .map(record => record.y)
        .min());
  }

  getAverage$(): Observable<number> {
    return this.record$
      .filter(r => !!r)
      .mergeMap(r => Observable.from(r.heartBeats)
        .map(r => r.y)
        .reduce(cumulPourMoyenne, {sum: 0, nb: 0})
        .map(accu => accu.sum / accu.nb));

    function cumulPourMoyenne(accu: {sum, nb}, current): {sum, nb} {
      return {sum: accu.sum + current, nb: accu.nb + 1};
    }
  }
}

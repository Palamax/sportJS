import { Pipe, PipeTransform } from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {Record} from '../record/record';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(exercices: Record[], category: string): Record[] {
    if (!category || !exercices) {
      return exercices;
    }
    return exercices.filter(e => e.category === category)

    /*const exercicesFilter: Exercice[] = [];
    exercices.forEach(function (e){
      if (e.category === category){
        exercicesFilter.push(e);
      }
    });
    return exercicesFilter;*/
  }

}

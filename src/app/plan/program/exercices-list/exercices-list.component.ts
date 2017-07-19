import {Component, Input, OnInit} from '@angular/core';
import {Exercice, LESSON} from '../../../shared/program/exercice';

class SelectableExercice extends Exercice {
  isSelected: boolean;
}

@Component({
  selector: 'sp-exercices-list',
  templateUrl: './exercices-list.component.html',
  styleUrls: ['./exercices-list.component.scss']
})
export class ExercicesListComponent implements OnInit {

  @Input() exercices: Exercice[];

  constructor() { }

  ngOnInit() { }

  isRenseigne(): boolean {
    return !!this.exercices.length;
  }

  isVide(): boolean {
    return !this.exercices.length;
  }

  deleteExercice(cpt: number): void {
    this.exercices.splice(cpt, 1);
  }

  upExercice(cpt: number): void {
    const exercice: Exercice = this.exercices[cpt];
    const exerciceUp: Exercice = this.exercices[cpt - 1];
    this.exercices[cpt - 1] = exercice;
    this.exercices[cpt] = exerciceUp;
  }

  downExercice(cpt: number): void {
    const exercice: Exercice = this.exercices[cpt];
    const exerciceDown: Exercice = this.exercices[cpt + 1];
    this.exercices[cpt + 1] = exercice;
    this.exercices[cpt] = exerciceDown;
  }

  getClassByCategory(exercice: Exercice ): string {
    if (exercice.category === LESSON) {
      return 'flaticon-people';
    } else if (exercice.category === CARDIO_TRAINING) {
      return 'flaticon-man-cycling';
    } else if (exercice.category === REINFORCEMENT) {
      return 'flaticon-weightlifting';
    }
  }

  toggleExercice(exo: SelectableExercice): void {
    exo.isSelected = !exo.isSelected;
  }
}

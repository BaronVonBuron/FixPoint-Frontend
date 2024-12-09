import { Injectable } from '@angular/core';
import {CaseModel} from '../Models/case-model';

@Injectable({
  providedIn: 'root'
})
export class SelectedCaseService {
  private currentCase: CaseModel | null = null;

  constructor() {}

  setCase(caseData: CaseModel) {
    this.currentCase = caseData;
  }

  getCase(): CaseModel | null {
    return this.currentCase;
  }
}

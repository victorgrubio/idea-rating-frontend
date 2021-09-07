export interface EvaluationSentence {
  id?: number;
  content: string;
  type: EvaluationSentenceType;
  weight: EvaluationSentenceWeight;
}

export enum EvaluationSentenceType{
  PRO='PRO',
  CON='CON'
}

export class EvaluationSentenceWeight {
  id: number;
  name: string;
  weight: number;

  constructor() {
    this.id = 1;
    this.name = '';
    this.weight = 0.0
  }
}

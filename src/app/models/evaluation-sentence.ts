export interface EvaluationSentence {
  id?: number;
  content: string;
  type: EvaluationSentenceType;
  weight: EvaluationSentenceWeight;
}

export enum EvaluationSentenceType{
  PRO='pro',
  CON='con'
}

export interface EvaluationSentenceWeight {
  id: number;
  name: string;
  weight: number;
}

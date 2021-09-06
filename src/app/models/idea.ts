import {EvaluationSentence} from "./evaluation-sentence";

export interface Idea {

  id: number;
  title: string;
  description: string;
  evaluationSentenceList: EvaluationSentence[];
}

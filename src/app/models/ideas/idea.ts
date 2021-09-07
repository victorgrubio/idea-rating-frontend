import {EvaluationSentence} from "./evaluation-sentence";

export class Idea {

  id: number;
  title: string;
  description: string;
  username?: string;
  evaluationSentenceList?: EvaluationSentence[];
  rating: number;

  constructor(){
    this.id = 1;
    this.rating = 0;
    this.title = "";
    this.description = "";
  }
}

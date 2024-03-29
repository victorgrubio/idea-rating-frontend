import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {IdeaService} from "../../services/idea.service";
import {
  EvaluationSentence,
  EvaluationSentenceType,
  EvaluationSentenceWeight
} from "../../models/ideas/evaluation-sentence";
import {DataStorageService} from "../../services/data-storage.service";
import {User} from "../../models/ideas/user";

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.css']
})
export class IdeaFormComponent implements OnInit {

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  sentenceTypeEnum = EvaluationSentenceType;
  sentenceImportanceWeightList :EvaluationSentenceWeight[] = [];
  user: User = new User();
  private conCounter: number = 0;
  private proCounter: number = 0;
  validProConSentences = true;
  MAX_SENTENCES = 5;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.user = this.dataStorageService.getUser();
    this.id = this.route.snapshot.params['ideaId'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      evaluationSentences: this.formBuilder.array([])
    });

    this.getImportanceWeightList();

    if (!this.isAddMode) {
      this.ideaService.getById(this.id)
        .pipe(first())
        .subscribe(idea => {
          this.form.patchValue(idea)
          idea.evaluationSentenceList?.map((sentence, index) => {
            this.getEvaluationSentencesControl().push(this.formBuilder.group(sentence))
          })
        })
    }
  }

  updateCounters(sentence: EvaluationSentence): void{
    if (sentence.type == EvaluationSentenceType.CON){ this.conCounter += 1}
    else if (sentence.type == EvaluationSentenceType.PRO){this.proCounter += 1}
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // get the subarray control
  get evaluationSentencesControl() {
    return this.getEvaluationSentencesControl()
  }

  getEvaluationSentencesControl(){
    return (this.form.get('evaluationSentences') as FormArray).controls;
  }

  addEvaluationSentence(): void{
    let control = this.form.controls['evaluationSentences'] as FormArray;
    control.push(this.createEvaluationSentence());
  }

  createEvaluationSentence(): FormGroup{
    return this.formBuilder.group({
      id: [null],
      content: [''],
      type: [''],
      weight: [new EvaluationSentenceWeight()]
    })
  }

  removeSentence(i: number) {
    // remove address from the list
    let control = <FormArray>this.form.controls['evaluationSentences'];
    control.removeAt(i);
  }

  getImportanceWeightList(){
    return this.ideaService.getSentenceWeights().subscribe(
      (data) => {
        this.sentenceImportanceWeightList = data;
      }
    )
  }

  onSubmit() {

    this.checkSentenceTypeConstraints()
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }


    if (this.isAddMode && this.validProConSentences) {
      console.log('creating idea')
      this.submitted = true;
      this.createIdea();
    } else if (this.validProConSentences) {
      console.log('updating idea')
      this.submitted = true;
      this.updateIdea();
    }

  }

  private createIdea() {
    this.ideaService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
        }
      });
  }

  private updateIdea() {
    this.ideaService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
        }
      });
  }

  checkSentenceTypeConstraints(): void{
    let controls = this.getEvaluationSentencesControl();
    controls.map(evaluationSentence => {
      this.updateCounters(evaluationSentence.value)
    })
    this.validProConSentences = !(this.proCounter > this.MAX_SENTENCES || this.conCounter > this.MAX_SENTENCES);
    this.proCounter = 0;
    this.conCounter = 0;

  }

}

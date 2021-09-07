import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {IdeaService} from "../../services/idea.service";
import {AlertService} from "../../services/alert.service";
import {EvaluationSentence, EvaluationSentenceType, EvaluationSentenceWeight} from "../../models/evaluation-sentence";
import {DataStorageService} from "../../services/data-storage.service";
import {User} from "../../models/user";

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService,
    private alertService: AlertService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.user = this.dataStorageService.getUser();
    this.id = this.route.snapshot.params['ideaId'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      evaluationSentences: this.formBuilder.array([this.createEvaluationSentence(),])
    });

    this.getImportanceWeightList();

    if (!this.isAddMode) {
      this.ideaService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          let fc = this.getEvaluationSentencesControl()
          this.form.patchValue(x)
          if (x.evaluationSentenceList){
            for (let i = 0; i < x.evaluationSentenceList.length; i++){
              let sentence: EvaluationSentence = x.evaluationSentenceList[i];
              fc[i].patchValue(sentence);
              if (i < x.evaluationSentenceList.length - 1){
                this.addEvaluationSentence();
              }
            }
          }
        });
    }
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
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      console.log('creating idea')
      this.createIdea();
    } else {
      console.log('updating idea')
      this.updateIdea();
    }
  }

  private createIdea() {
    this.ideaService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Idea added', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateIdea() {
    this.ideaService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Idea updated', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

}

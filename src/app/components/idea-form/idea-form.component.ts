import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {IdeaService} from "../../services/idea.service";
import {AlertService} from "../../services/alert.service";

class EvaluationSentence {
}

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['ideaId'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      evaluationSentences: this.formBuilder.array([this.createEvaluationSentence(),])
    });

    if (!this.isAddMode) {
      this.ideaService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  // get the subarray control
  get evaluationSentencesControl() {
    return (this.form.get('evaluationSentences') as FormArray).controls;
  }

  addEvaluationSentence(): void{
    let control = this.form.controls['evaluationSentences'] as FormArray;
    control.push(this.createEvaluationSentence());
  }

  createEvaluationSentence(): FormGroup{
    return this.formBuilder.group({
      content: [''],
      type: ['PRO'],
      weight: ['LOW']
    })
  }

  removeSentence(i: number) {
    // remove address from the list
    let control = <FormArray>this.form.controls['evaluationSentences'];
    control.removeAt(i);
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
      this.createIdea();
    } else {
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

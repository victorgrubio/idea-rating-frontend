import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaVoteFormComponent } from './idea-vote-form.component';

describe('IdeaVoteFormComponent', () => {
  let component: IdeaVoteFormComponent;
  let fixture: ComponentFixture<IdeaVoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaVoteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaVoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

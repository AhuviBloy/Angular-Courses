import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLessonDialogComponent } from './update-lesson-dialog.component';

describe('UpdateLessonDialogComponent', () => {
  let component: UpdateLessonDialogComponent;
  let fixture: ComponentFixture<UpdateLessonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLessonDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

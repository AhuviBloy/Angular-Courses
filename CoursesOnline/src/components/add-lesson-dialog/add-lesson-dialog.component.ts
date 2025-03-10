import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-lesson-dialog',
  standalone:true,
  imports: [MatDialogModule,ReactiveFormsModule,MatFormFieldModule,CommonModule, MatInputModule,MatButtonModule  ],
  templateUrl: './add-lesson-dialog.component.html',
  styleUrl: './add-lesson-dialog.component.css'
})
export class AddLessonDialogComponent {
  lessonForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.lessonForm = this.fb.group({
      title: [data.lesson?.title || '', Validators.required],
      content: [data.lesson?.content || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.lessonForm.valid) {
      this.dialogRef.close(this.lessonForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule],
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent {
  courseTitle: string = '';
  courseDescription: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // קבלת נתוני הקורס
  ) {
    this.courseTitle = data.course ? data.course.title : ''; // ערך ברירת מחדל
    this.courseDescription = data.course ? data.course.description : ''; // ערך ברירת מחדל

  }

  onSubmit(): void {
    const courseData = {
      title: this.courseTitle,
      description: this.courseDescription
    };
    this.dialogRef.close(courseData); // סגירת הדיאלוג עם נתוני הקורס
  }

  Close(): void {
    this.dialogRef.close();
  }
}

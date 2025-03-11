import { CoursesService } from '../../services/courses/courses.service';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateCourse } from '../../models/course';

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './update-course-dialog.component.html',
  styleUrls: ['./update-course-dialog.component.css'],
})
export class UpdateCourseDialogComponent {
  title: string = '';
  description: string = '';
  teacherId: number = 0;
  courseId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<UpdateCourseDialogComponent>,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public data: any // קבלת נתוני הקורס
  ) {
    this.title = data.course ? data.course.title : ''; // ערך ברירת מחדל
    this.description = data.course ? data.course.description : ''; // ערך ברירת מחדל
    this.teacherId = data.course ? data.course.teacherId : 0; // ערך ברירת מחדל
    this.courseId = data.course ? data.course.id : 0; // ערך ברירת מחדל
  }

  onSubmit(): void {
    const courseData: UpdateCourse = {
      title: this.title,
      description: this.description,
      teacherId: this.teacherId,
    };
    this.dialogRef.close(courseData);
  }

  close(): void {
    this.dialogRef.close();
  }
}

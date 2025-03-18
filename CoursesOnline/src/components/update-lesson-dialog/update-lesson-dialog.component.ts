import { CoursesService } from '../../services/courses/courses.service';
import { Component, Inject, Input } from '@angular/core';
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
import { LessonService } from '../../services/lessons/lessons.service';

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
  templateUrl: './update-lesson-dialog.component.html',
  styleUrls: ['./update-lesson-dialog.component.css'],
})
export class UpdateLessonDialogComponent {
  title: string = '';
  content: string = '';
  @Input() courseId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateLessonDialogComponent>,
    private lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.title = data.lesson ? data.lesson.title : ''; 
    this.content = data.lesson ? data.lesson.content : ''; 
    this.courseId = data.courseId; 
  }

  onSubmit(): void {
    const courseData: any = {
      title: this.title,
      content: this.content,
      courseId: this.courseId,
    };
    this.dialogRef.close(courseData);
  }

  close(): void {
    this.dialogRef.close();
  }
}

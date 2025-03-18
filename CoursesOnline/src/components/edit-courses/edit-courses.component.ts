import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { LessonsComponent } from '../lessons/lessons.component';
import { AddLessonDialogComponent } from '../add-lesson-dialog/add-lesson-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LessonService } from '../../services/lessons/lessons.service';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { UpdateCourseDialogComponent } from '../update-course-dialog/update-course-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Roles } from '../../enum/roles';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrl: './edit-courses.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    LessonsComponent,
    MatInputModule,
  ],
})
export class EditCoursesComponent implements OnInit {
  courses: Course[] = [];
  tempCourse: Course = { id: -1, title: '', description: '',teacherId: -1 };
  showLessons: number | null = null;
  role: Roles | null = null;
  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private lessonService: LessonService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    if( this.authService.isLoggedIn()){
      this.courseService.getAllCourses().subscribe(
        (data: Course[]) => {
          this.courses = data;
        },
        (error) => {
          alert('Error fetching courses');
        }
      );
    }
    this.role = this.authService.getRole();
  }

  showLessonsForCourse(courseId: number): void {
    this.showLessons = this.showLessons == courseId ? null : courseId;
  }

  openAddLessonDialog(courseId: number): void {
    const dialogRef = this.dialog.open(AddLessonDialogComponent, {
      width: '400px',
      data: { courseId }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New lesson data:', result);
        this.lessonService.addLesson(courseId.toString(), result).subscribe({
          next: (response) => {
            console.log('Lesson added successfully:', response);
            this.showLessonsForCourse(courseId);
          },
          error: (error) => {
            alert('Error adding lesson');
          },
        });
      }
    });
  }

  openAddCourseDialog(courseData: Course) {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      data: { course: courseData }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.addCourse(result).subscribe({
          next: (response) => {
            console.log('Course updated successfully:', response);
          },
          error: (error) => {
            alert('Error updating course');
          },
        });
      }
    });
  }

  openEditCourseDialog(courseData: Course): void {
    const dialogRef = this.dialog.open(UpdateCourseDialogComponent, {
      data: { course: courseData }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.updateCourse(courseData.id, result).subscribe({
          next: (response) => {
            console.log('Course updated successfully:', response);
            const index = this.courses.findIndex(
              (course) => course.id === courseData.id
            );
            if (index !== -1) {
              this.courses[index] = { ...this.courses[index], ...result };
            }
          },
          error: (error) => {
            alert('Error updating course');
          },
        });
      }
    });
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response) => {
        console.log('Course deleted successfully:', response);
        this.courses = this.courses.filter((course) => course.id !== courseId);
      },
      error: (error) => {
        alert('Error deleting course');
      },
    });
  }
}

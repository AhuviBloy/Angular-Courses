import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthService } from '../../services/auth/auth.service';
import { LessonsComponent } from "../lessons/lessons.component";
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-my-courses',
  standalone:true,
  imports: [CommonModule, MatCardModule, MatButton, LessonsComponent,MatInputModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

  courses: Course[] = [];
  showLessons: number | null = null;

  constructor(
    private coursesService: CoursesService,
     private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.coursesService.getCoursesByStudentId(userId).subscribe(
        (data: Course[]) => {
          this.courses = data;
        },
        (error) => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }

  toggleLessons(courseId: number): void {
    this.showLessons = this.showLessons === courseId ? null : courseId;
  }
}

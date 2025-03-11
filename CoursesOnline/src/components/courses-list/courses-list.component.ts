import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { LessonsComponent } from "../lessons/lessons.component";
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LessonService } from '../../services/lessons/lessons.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl:'./courses-list.component.css',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton, LessonsComponent,MatInputModule]
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  showLessons: number |null = null;
  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private lessonService: LessonService,
    private authService:AuthService) { }

  ngOnInit(): void {
    if( this.authService.isLoggedIn()){
      this.courseService.getAllCourses().subscribe(
        (data: Course[]) => {
          this.courses = data;
        },
        (error) => {
          // console.error('Error fetching courses:', error);
          alert('Error fetching courses');
        }
      );
    }
   
  }

  showLessonsForCourse(courseId: number): void {
    this.showLessons = this.showLessons == courseId ? null : courseId;
  }
  
  join(courseId: number): void {
    const userJson = sessionStorage.getItem('user'); // שליפת ה-JSON מה-session storage
  
    
      const userId = this.authService.getUserId();
      if(userId){
      this.courseService.enrollInCourse(courseId, userId).subscribe(
        (response) => {
          console.log('Successfully enrolled in course:', response);
          alert('Successfully enrolled in course');
        },
        (error) => {
          // console.error('Error enrolling in course:', error);
          alert('Error enrolling in course');
        }
      );
    } else {
      // console.error('User not found in session storage. Please log in first.');
      alert('User not found in session storage. Please log in first.');
    }
  }
 

  leave(courseId: number): void {
    const userJson = sessionStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    const userId = user.id; 
    this.courseService.unenrollFromCourse(courseId, userId).subscribe(
      (response) => {
        console.log('Successfully unenrolled from course:', response);
        alert('Successfully unenrolled from course');
      },
      (error) => {
        // console.error('Error unenrolling from course:', error);
        alert('Error unenrolling from course');
      }
    );
  }
  
  
}

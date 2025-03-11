import { Component, Input, OnInit } from '@angular/core';
import { LessonService } from '../../services/lessons/lessons.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateLesson } from '../../models/lessons';
import { MatDialog } from '@angular/material/dialog';
import { UpdateLessonDialogComponent } from '../update-lesson-dialog/update-lesson-dialog.component';

@Component({
  selector: 'app-lessons',
  standalone:true,
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  imports:[MatCardModule,MatListModule, MatButtonModule, MatIconModule, MatMenuModule]
})
export class LessonsComponent implements OnInit {
  lessons: any[] = [];
  role:string='';
  @Input() courseId: number | null = null;

  constructor(private lessonService: LessonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.courseId) {
      this.loadLessons();
    } else {
      // console.error('Course ID is null');
      alert('Course ID is null');
    }
    const userJson = sessionStorage.getItem('user'); // שליפת ה-JSON מה-session storage
  
    if (userJson) {
      const user = JSON.parse(userJson); // המרת ה-JSON לאובייקט
      this.role = user.role; // שליפת ה-ID של המשתמש  }
      }
    }

  loadLessons(): void {
    if (this.courseId) {
      this.lessonService.getLessonsByCourseId(this.courseId.toString()).subscribe(
        (lessons) => {
          this.lessons = lessons;
        },
        (error) => {
          // console.error('Error fetching lessons:', error);
          alert('Error fetching lessons');
        }
      );
    }
  }

  openEditLessonDialog(lessonData: any): void {
      const dialogRef = this.dialog.open(UpdateLessonDialogComponent, {
        data: { lesson: lessonData,
          courseId: lessonData.courseId
         }, 
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.lessonService.updateLesson(lessonData.id, result).subscribe({
            next: (response) => {
              console.log('Course updated successfully:', response);
              const index = this.lessons.findIndex(
                (course) => course.id === lessonData.id
              );
              if (index !== -1) {
                this.lessons[index] = { ...this.lessons[index], ...result };
              }
            },
            error: (error) => {
              // console.error('Error updating course:', error);
              alert('Error updating course');
            },
          });
        }
      });
  }

  deleteLesson(lessonId: number): void {
    if (this.courseId) {
      this.lessonService.deleteLesson(this.courseId,lessonId).subscribe(
        () => {
          this.loadLessons(); 
        },
        (error) => {
          // console.error('Error deleting lesson:', error);
          alert('Error deleting lesson');
        }
      );
    }
  }
}

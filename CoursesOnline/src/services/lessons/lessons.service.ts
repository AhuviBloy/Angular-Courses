// lesson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateCourse } from '../../models/course';
import { UpdateLesson } from '../../models/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses/'; // החלף ב-URL שלך

  constructor(private http: HttpClient) {}

  getLessonsByCourseId(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}:${courseId}/lessons`);
  }

  addLesson(courseId: string, lessonData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}:${courseId}/lessons`, lessonData);
  }

  updateLesson(lessonId: number, updates: UpdateLesson): Observable<any> {
    return this.http.put(`${this.apiUrl}${updates.courseId}/lessons/${lessonId}`, updates);
  }

  deleteLesson(courseId: number, lessonId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${courseId}/lessons/${lessonId}`);
  }
}

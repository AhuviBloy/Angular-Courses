import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateCourse } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addCourse( updates: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, updates);
  }

  updateCourse(courseId: number, updates: UpdateCourse): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, updates);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }

  enrollInCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  unenrollFromCourse(courseId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } });
  }

  getCoursesByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/${studentId}`);
  }

}

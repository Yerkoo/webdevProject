import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class CourseService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categories/`);
  }
  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}courses/`, courseData);
  }
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}courses/`);
  }
  deleteCourse(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}courses/${id}/`);
  }
  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}courses/${id}/`);
  }
  updateCourse(id: number, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}courses/${id}/`, courseData);
  }
  getFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}favorites/`);
  }
  addFavorite(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}favorites/`, { course: courseId });
  }
  removeFavorite(favoriteId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}favorites/${favoriteId}/`);
  }
}
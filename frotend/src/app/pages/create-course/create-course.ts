import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './create-course.html',
  styleUrl: './create-course.css'
})
export class CreateCourse implements OnInit {
  courseName: string = '';
  courseDescription: string = '';
  youtubeLink: string = '';
  avatarUrl: string = '';

  categories: any[] = []; 
  selectedCategoryId: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/categories/').subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Successfully loaded categories:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories (is backend running?)', err);
      }
    });
  }



 onSubmit() {
    const newCourse = {
      title: this.courseName,
      description: this.courseDescription,
      video_url: this.youtubeLink,
      avatar_url: this.avatarUrl,
      category: this.selectedCategoryId 
    };

    console.log('Отправляем на бэкенд:', newCourse);
    // Чуть позже тут будет this.http.post(...)
  }
}
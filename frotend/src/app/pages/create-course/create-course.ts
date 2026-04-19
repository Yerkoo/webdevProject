import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './create-course.html',
  styleUrl: './create-course.css'
})
export class CreateCourse {
  courseName: string = '';
  courseDescription: string = '';
  youtubeLink: string = '';
  avatarUrl: string = '';

  onSubmit() {
    console.log('Готовим к отправке на бэкенд:', {
      title: this.courseName,
      description: this.courseDescription,
      video_url: this.youtubeLink,
      avatar_url: this.avatarUrl
    });
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule], // Оставили только формы
  templateUrl: './create-course.html',
  styleUrl: './create-course.css'
})
export class CreateCourse {
  courseName: string = '';
  courseDescription: string = '';
  youtubeLink: string = '';

  onSubmit() {
    console.log('Готовим к отправке на бэкенд:', {
      title: this.courseName,
      description: this.courseDescription,
      video_url: this.youtubeLink
    });
  }
}
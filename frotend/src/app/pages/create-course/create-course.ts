import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Router } from '@angular/router';

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

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.courseService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
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

    this.courseService.createCourse(newCourse).subscribe({
      next: (response) => {
        alert('Successfully created course!');
        
        this.courseName = '';
        this.courseDescription = '';
        this.youtubeLink = '';
        this.avatarUrl = '';
        this.selectedCategoryId = '';
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Error creating course:', err);
        alert('Oops, something went wrong.');
      }
    });
  }
}
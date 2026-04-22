import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
  courseId!: number;
  
  courseName: string = '';
  courseDescription: string = '';
  youtubeLink: string = '';
  avatarUrl: string = '';
  selectedCategoryId: string = '';
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.courseId = this.route.snapshot.params['id'];

    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.courseName = course.title; 
      this.courseDescription = course.description;
      this.youtubeLink = course.youtube_link; 
      this.avatarUrl = course.avatar_url;
      this.selectedCategoryId = course.category;
    });
  }
  onSubmit(): void {
    const updatedData = {
      title: this.courseName,
      description: this.courseDescription,
      youtube_link: this.youtubeLink,
      avatar_url: this.avatarUrl,
      category: this.selectedCategoryId
    };

    this.courseService.updateCourse(this.courseId, updatedData).subscribe({
      next: () => {
        alert('Course updated successfully!');
        this.router.navigate(['/main/course']); 
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update course. Please try again.');
      }
    });
  }
}
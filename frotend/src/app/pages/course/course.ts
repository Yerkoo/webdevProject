import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course.html',
  styleUrl: './course.css'
})
export class CoursesComponent implements OnInit {
  allCourses: any[] = [];      
  filteredCourses: any[] = []; 
  categories: any[] = [];      
  activeCategoryId: string = 'all'; 

  constructor(
    private courseService: CourseService, 
    private cdr: ChangeDetectorRef,
    private router: Router 
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.courseService.getCategories().subscribe(data => {
      this.categories = data;
      this.cdr.detectChanges();
    });

    this.courseService.getAllCourses().subscribe(data => {
      this.allCourses = data;
      this.setFilter('all'); 
      this.cdr.detectChanges();
    });
  }

  viewCourse(courseId: number) {
    this.router.navigate(['/main/course', courseId]); 
  }

  setFilter(categoryId: string) {
    this.activeCategoryId = categoryId;
    if (categoryId === 'all') {
      this.filteredCourses = this.allCourses; 
    }  else if (categoryId === 'my') {
      const userString = localStorage.getItem('user'); 
      let currentUsername = '';
      if (userString) {
        const userObject = JSON.parse(userString);
        currentUsername = userObject.username; 
      }
      this.filteredCourses = this.allCourses.filter(course => course.author_name === currentUsername);
    } else {
      this.filteredCourses = this.allCourses.filter(course => course.category?.toString() === categoryId.toString());
    }
  }
}
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
  favoriteCourses: any[] = [];       
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
    this.loadFavorites();
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
  loadFavorites(): void {
    this.courseService.getFavorites().subscribe({
      next: (favorites) => {
        // Достаем ТОЛЬКО айдишники курсов и кладем их в массив
        this.favoriteCourses = favorites.map((fav: any) => {
          return typeof fav.course === 'object' ? fav.course.id : Number(fav.course);
        });
        console.log('ID любимых курсов:', this.favoriteCourses); // Теперь тут будет четко [1]
      },
      error: (err) => console.error('Ошибка:', err)
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
    } else if (categoryId === 'favorites') {
     this.filteredCourses = this.allCourses.filter(course => this.favoriteCourses.includes(course.id));
    } else {
      this.filteredCourses = this.allCourses.filter(course => course.category?.toString() === categoryId.toString());
    }
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-deteil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-deteil.html',
  styleUrls: ['./course-deteil.css']
})
export class CourseDeteil implements OnInit {
  course: any = null;
  userName: string = 'Guest';
  userEmail: string = 'guest@example.com';
  currentUserId: number | null = null;
  isFavorite: boolean = false; 
  favoriteId: number | null = null;
  userRating: number = 0;
  isOwner: boolean = false; 

  reviews: any[] = []; 
  newReviewText: string = ''; 
  newReviewRating: number = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCourseData();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const courseId = Number(idParam); 
      this.loadReviews(courseId);
      this.courseService.getCourseById(courseId).subscribe({
        next: (data) => {
          this.course = data; 
          this.checkIfFavorite(); 
        },
        error: (err) => console.error('Ошибка загрузки курса:', err)
      });
    }
  }

  private loadUserData(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        this.userName = userObj.username || userObj.name || 'Guest';
        this.userEmail = userObj.email || 'guest@example.com';
        this.currentUserId = userObj.id; 
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }

  private loadCourseData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getAllCourses().subscribe({
        next: (data) => {
          this.course = data.find((c: any) => String(c.id) === String(id));
          
          if (this.course) {
            const currentUser = this.userName; 
            const courseAuthor = this.course.author_name;
            if (currentUser && courseAuthor && currentUser === courseAuthor) {
              this.isOwner = true;  
            } else {
              this.isOwner = false; 
            }

            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error("Error loading course:", err)
      });
    }
  }

  deleteCourse(): void {
    if (confirm("Are you sure you want to delete this course?")) {
      console.log("Deleting course ID:", this.course.id);
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => {
          this.router.navigate(['/main/course']);
        },
        error: (err) => console.error("Error deleting course:", err)
      });
    }
  }

  updateCourse(): void {
    console.log("Navigating to update page for course ID:", this.course.id);
    this.router.navigate(['/main/course/edit', this.course.id]);
  }

  setUserRating(rating: number): void {
    this.userRating = rating;
    this.cdr.detectChanges();
  }

  checkIfFavorite(): void {
    this.courseService.getFavorites().subscribe(favorites => {
      const existingFavorite = favorites.find((fav: any) => 
        fav.course === this.course.id || (fav.course && fav.course.id === this.course.id)
      );
      
      if (existingFavorite) {
        this.isFavorite = true; 
        this.favoriteId = existingFavorite.id; 
        console.log('Found favorite ID:', this.favoriteId);
      }
      this.cdr.detectChanges();
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite && this.favoriteId !== null) {
      this.courseService.removeFavorite(this.favoriteId).subscribe({
        next: () => {
          this.isFavorite = false; 
          this.favoriteId = null;
          console.log('Successfully removed from favorites! ID was:', this.favoriteId);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error removing favorite:', err)
      });
    } 
    else {
      this.courseService.addFavorite(this.course.id).subscribe({
        next: (response) => {
          this.isFavorite = true; 
          this.favoriteId = response.id; 
          console.log('Successfully added to favorites! ID is:', response.id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error adding favorite:', err)
      });
    }
  }
  
  loadReviews(courseId: number): void {
    this.courseService.getReviewsByCourse(courseId).subscribe({
      next: (data) => {
        this.reviews = data;
        console.log('Reviews loaded:', this.reviews);
        
      },
      error: (err) => console.error('Error loading reviews:', err)
    });
  }

  submitReview(): void {
    if (!this.newReviewText.trim()) {
      alert('Please enter a review comment.');
      return;
    }

    const reviewData = {
      course: this.course.id,      
      rating: this.newReviewRating, 
      comment: this.newReviewText   
    };

    this.courseService.addReview(reviewData).subscribe({
      next: (newReview) => {
        alert('Спасибо за отзыв!');
        this.reviews.unshift(newReview); 
        
        this.newReviewText = ''; 
        this.newReviewRating = 5;
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        alert('Error submitting review. Please try again later.');
      }
    });
  }
  // Умная переменная для подсчета среднего рейтинга
  get averageRating(): string {
    // Если отзывов еще нет, показываем 0.0
    if (this.reviews.length === 0) {
      return '0.0';
    }

    // Складываем все оценки вместе (1+5+4...)
    const totalScore = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    
    // Делим на количество отзывов и оставляем 1 знак после запятой (например, 4.5)
    return (totalScore / this.reviews.length).toFixed(1);
  }

  goBack(): void {
    this.router.navigate(['/main/course']);
  }

  startLearning(): void {
    const link = this.course?.video_url || this.course?.course_link;
    if (link) {
      window.open(link, '_blank');
    }
  }
}
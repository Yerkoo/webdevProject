import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-deteil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-deteil.html',
  styleUrls: ['./course-deteil.css']
})
export class CourseDeteil implements OnInit {
  course: any = null;
  userName: string = 'Guest';
  userEmail: string = 'guest@example.com';
  currentUserId: number | null = null;
  
  isSaved: boolean = false;
  userRating: number = 0;
  isOwner: boolean = false; // Flag to check if current user is the author

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCourseData();
  }

  private loadUserData(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        this.userName = userObj.username || userObj.name || 'Guest';
        this.userEmail = userObj.email || 'guest@example.com';
        this.currentUserId = userObj.id; // Get current user's ID
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
            // Logic to check ownership
            // Assuming course object has 'author_id' or 'user_id'
            this.isOwner = this.course.author_id === this.currentUserId;
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
      // Logic for service call: this.courseService.delete(this.course.id)...
      this.router.navigate(['/main/course']);
    }
  }

  updateCourse(): void {
    console.log("Navigating to update page for course ID:", this.course.id);
    // Logic: this.router.navigate(['/update-course', this.course.id]);
  }

  setUserRating(rating: number): void {
    this.userRating = rating;
    this.cdr.detectChanges();
  }

  toggleSave(): void {
    this.isSaved = !this.isSaved;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goToMain(): void {
    this.router.navigate(['/main/course']);
  }

  startLearning(): void {
    const link = this.course?.video_url || this.course?.course_link;
    if (link) {
      window.open(link, '_blank');
    }
  }
}
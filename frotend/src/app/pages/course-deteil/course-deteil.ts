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
  currentUserId: any = null;
  isOwner: boolean = false;
  isSaved: boolean = false;
  userRating: number = 0;

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
        this.userName = userObj.username || 'Guest';
        this.userEmail = userObj.email || '';
        this.currentUserId = userObj.id; 
      } catch (e) { console.error("User parsing error:", e); }
    }
  }

  private loadCourseData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getAllCourses().subscribe({
        next: (data) => {
          this.course = data.find((c: any) => String(c.id) === String(id));
          if (this.course) {
            // Ownership validation: checks if current user is the author
            this.isOwner = String(this.course.author_id) === String(this.currentUserId);
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error("Data loading error:", err)
      });
    }
  }

  deleteCourse(): void {
    if (!this.isOwner) {
      alert("Permission denied. You are not the author of this course.");
      return;
    }

    if (confirm("Are you sure you want to delete your course? This action cannot be undone.")) {
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => {
          alert("Course deleted successfully.");
          this.router.navigate(['/main/course']);
        },
        error: (err) => {
          console.error("Delete error:", err);
          alert("Failed to delete course. Please check your connection.");
        }
      });
    }
  }

  updateCourse(): void {
    if (this.isOwner) {
      this.router.navigate(['/main/update-course', this.course.id]);
    }
  }

  goToMain(): void { this.router.navigate(['/main/course']); }
  logout(): void { 
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); 
  }
  setUserRating(rating: number): void { this.userRating = rating; this.cdr.detectChanges(); }
  toggleSave(): void { this.isSaved = !this.isSaved; }
}
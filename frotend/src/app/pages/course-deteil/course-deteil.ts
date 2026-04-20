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
  // Course data, initially null
  course: any = null;
  
  // User profile data from main page
  userName: string = 'Guest';
  userEmail: string = 'guest@example.com';
  
  // Save status
  isSaved: boolean = false;
  
  // New interactive user rating state (0-5)
  userRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef // Required for ngIf and variable updates
  ) {}

  ngOnInit(): void {
    // 1. Load user profile data on init
    this.loadUserData();
    
    // 2. Load dynamic course data
    this.loadCourseData();
  }

  // Set user profile from main page, handles JSON parsing
  private loadUserData(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        this.userName = userObj.username || userObj.name || 'Guest';
        this.userEmail = userObj.email || 'guest@example.com';
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
            console.log("Course loaded ✅:", this.course);
            // Update the view after data is loaded
            this.cdr.detectChanges();
          } else {
            console.error("Course not found for ID:", id);
          }
        },
        error: (err) => console.error("Error loading courses:", err)
      });
    }
  }

  setUserRating(rating: number): void {
    this.userRating = rating;
    this.cdr.detectChanges();
  }

  // Toggle course save status
  toggleSave(): void {
    this.isSaved = !this.isSaved;
    console.log(`Course save status is now: ${this.isSaved}`);
  }

  // Logout and redirect to login page
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Redirect to main courses page
  goToMain(): void {
    this.router.navigate(['/main/course']);
  }

  // Open course link in a new tab
  startLearning(): void {
    const link = this.course?.video_url || this.course?.course_link;
    if (link) {
      window.open(link, '_blank');
    } else {
      alert("This course has no dynamic link.");
    }
  }
}
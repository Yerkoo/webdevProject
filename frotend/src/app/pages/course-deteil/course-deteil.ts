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
  isSaved: boolean = false; // "Сақтау" күйі

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
      } catch (e) {
        console.error("User data error:", e);
      }
    }
  }

  private loadCourseData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getAllCourses().subscribe({
        next: (data) => {
          this.course = data.find((c: any) => String(c.id) === String(id));
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error fetching course:", err)
      });
    }
  }

  // Save
  toggleSave(): void {
    this.isSaved = !this.isSaved;
  }

  // Exit to the auth
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Go to main page
  goToMain(): void {
    this.router.navigate(['/main/course']);
  }

  // Start learning
  startLearning(): void {
    const link = this.course?.video_url || this.course?.course_link;
    if (link) {
      window.open(link, '_blank');
    }
  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.error = '';

    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {

        
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);

       
        localStorage.setItem('user', JSON.stringify({
          username: this.username,
          email: this.username  
        }));

        
        this.router.navigate(['/main']);
      },

      error: () => {
        this.error = 'Login failed. Check your username and password.';
      }
    });
  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  passwordConfirm = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.error = '';

    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password,
      password_confirm: this.passwordConfirm
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Registration failed. Please check your data.';
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive  } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.html',
  styleUrls: ['./main.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class MainComponent implements OnInit {

  userName = '';
  userEmail = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userName = user.username || 'User';
    this.userEmail = user.email || 'user@email.com';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
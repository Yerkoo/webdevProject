import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  template: `
    <div style="padding:40px; font-family:Poppins;">
      <h1>Welcome to Main Page </h1>
      <p>You are successfully logged in.</p>
    </div>
  `
})
export class MainComponent {}
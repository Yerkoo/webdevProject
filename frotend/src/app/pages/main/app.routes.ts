import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CourseDeteil } from '../course-deteil/course-deteil'; 

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'course/:id', component: CourseDeteil }, 
  { path: '**', redirectTo: 'main' }
];
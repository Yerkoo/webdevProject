import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { CourseDeteil } from './pages/course-deteil/course-deteil';
import { CreateCourse } from './pages/create-course/create-course';
import { CoursesComponent } from './pages/course/course';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'main', 
    component: MainComponent, 
    children: [
      { path: 'course', component: CoursesComponent },
      { path: 'course/:id', component: CourseDeteil },
      { path: 'create', component: CreateCourse },
      { path: '', redirectTo: 'course', pathMatch: 'full' } 
    ]
  },

  { path: '**', redirectTo: 'login' }
];


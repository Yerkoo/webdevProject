import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { CourseDeteil } from './pages/course-deteil/course-deteil';
import { CreateCourse } from './pages/create-course/create-course';
import { Course } from './pages/course/course';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'main', 
    component: MainComponent, 
    children: [
      { path: 'course', component: Course },
      { path: 'course/:id', component: CourseDeteil },
      { path: 'create', component: CreateCourse },
      { path: '', redirectTo: 'course', pathMatch: 'full' } 
    ]
  },

  // Если ввели несуществующую ссылку (404), кидаем на логин
  { path: '**', redirectTo: 'login' }
];


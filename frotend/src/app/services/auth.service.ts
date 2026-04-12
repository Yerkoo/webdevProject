import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.API + 'login/', data)
      .pipe(tap((res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
      }));
  }

  register(data: any) {
    return this.http.post(this.API + 'register/', data)
      .pipe(tap((res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
      }));
  }

  getProfile() {
    return this.http.get(this.API + 'profile/');
  }

  logout() {
    localStorage.clear();
  }
}
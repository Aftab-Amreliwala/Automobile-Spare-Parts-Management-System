import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {

    if (!this.email || !this.password) {
      alert('Enter email & password ❗');
      return;
    }

    this.isLoading = true;

    this.http.post<any>('http://localhost:3000/api/login', {
      email: this.email,
      password: this.password
    })
    .subscribe({
      next: (res) => {
        alert('Login successful ✅');

        // save login
        localStorage.setItem('user', JSON.stringify(res.user));

        // redirect
        this.router.navigate(['/category/view']);

        this.isLoading = false;
      },
      error: () => {
        alert('Invalid email or password ❌');
        this.isLoading = false;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {
    username: '',
    password: ''
  };
  returnUrl: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the return URL from the route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(): void {
    this.authService.login(this.formData).subscribe(
      response => {
        if (this.authService.getRole() === 'student') {
          console.log('Login successful');
          alert('Login successful'); // Fixed typo here
          // Redirect to the return URL after successful login
          this.router.navigateByUrl('/studentDetails');
        } else {
          console.log('Login successful');
          alert('Login successful'); // Fixed typo here
          // Redirect to the return URL after successful login
          this.router.navigateByUrl('/home');
        }
      },
      error => {
        console.error('Login failed:', error);
        alert('Login failed, please check your credentials'); // Better error message
      }
    );
  }
}

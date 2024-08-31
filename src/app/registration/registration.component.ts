import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formData = {
    username: '',
    password: '',
    role: 'student' // Default role
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Assuming you have a register method in your AuthService to handle registration
    this.authService.register(this.formData).subscribe(
      () => {
        console.log('Registration successful');
        alert('Registered')
        
        // Optionally, you can navigate to another page after successful registration
      },
      error => {
        console.error('Registration failed:', error);
        alert('Registeration failed')
      }
    );
  }
}

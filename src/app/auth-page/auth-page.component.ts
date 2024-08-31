import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  showLogin: boolean = true; // Initially show the login component

  constructor() { }

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.showLogin = !this.showLogin; // Toggle between showing login and registration
  }
}

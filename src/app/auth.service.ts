import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8080';
  private userRole: string | null = null;

  constructor(private http: HttpClient) { }

  getRole(): string | null {
    return this.userRole;
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: { role: string | null; }) => {
          this.userRole = response.role; // Store the role in the variable
        })
      );
  }
  logout(): void {
    this.userRole = null; // Clear the stored user role
  }
  private isLoggedInVar: boolean = false;

  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  // Method to set user's login status
  setLoggedIn(value: boolean): void {
    this.isLoggedInVar = value;
  }
}

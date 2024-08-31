import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = next.data['roles'] as Array<string>;
    const userRole = this.authService.getRole();
    
    // Check if the user role is null (not logged in)
    if (userRole === null) {
      // Redirect to login page
      this.router.navigate(['/auth']);
      return false;
    }

    // Check if the user role is allowed to access the route
    if (roles.includes(userRole)) {
      return true;
    } else {
      // Navigate to an unauthorized page
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}

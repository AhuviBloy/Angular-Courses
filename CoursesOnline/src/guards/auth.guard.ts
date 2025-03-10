// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth/auth.service';
// import { log } from 'console';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     const token = sessionStorage.getItem('authToken');
//     if (!token) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }


import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        return true; // אם אין טוקן, אפשר לגשת
      } else {
        this.router.navigate(['/login']);
        return false; // אם יש טוקן, לא אפשר לגשת
      }
    }
    return true; // אם לא בדפדפן, אפשר לגשת
  }
}

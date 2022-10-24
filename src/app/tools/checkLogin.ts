import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppService } from "../app.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class CheckLogin implements CanActivate {
  constructor(private app: AppService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.app.verifyToken().subscribe((isValid: boolean) => {
      if (!isValid) {
        this.app.goTo('/login');
        localStorage.removeItem(this.app.keys.jwt);
        localStorage.removeItem(this.app.keys.jwtTime);
        this.app.isLog.next(false);
        return false;
      }
      this.app.isLog.next(true);
      return true;
    });
  }
}

//canActivate(
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable < boolean > | Promise < boolean > | boolean {
//   const token = this.auth.getToken();
//
//   if (!token) {
//     this.router.navigate(['/login']);
//     return false;
//   }
//
//   return this.auth.verifyToken().pipe(
//     catchError(err => {
//       console.log('Handling error locally and rethrowing it...', err);
//       this.router.navigate(['/login']);
//       return of(false);
//     })
//   );
//
// }

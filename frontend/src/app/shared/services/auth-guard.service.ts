import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn

    if ((typeof window !== 'undefined')) {

      isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }

    if (!isLoggedIn) {
      this.router.navigate(['/user-login']);
      return false;
    }
    return true;

  }

}

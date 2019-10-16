import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private nbAuthService:NbAuthService, private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.nbAuthService.isAuthenticated().subscribe(isAuthenticated=>{
        console.log(isAuthenticated);
        if(!isAuthenticated){
          this.router.navigate(['/auth'])
        }
      })

    return this.nbAuthService.isAuthenticated();
  }
  
}

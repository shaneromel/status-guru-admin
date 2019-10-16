import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(private nbAuthService:NbAuthService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject)=>{
      this.nbAuthService.isAuthenticated().subscribe(isAuthenticated=>{

        if(isAuthenticated){
          this.router.navigate(['pages']);
        }

        resolve(!isAuthenticated);
      })
    })
  }
  
}

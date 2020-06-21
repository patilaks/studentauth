import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate{
  
    constructor(private authservice:AuthService,private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | Observable<boolean>|Promise<boolean>
    {
        let isAuth;
        this.authservice.adminauth().subscribe(data=>{
              console.log(data)
               isAuth=data
        }); 
        if(!isAuth)
        {
            this.router.navigate(['/']);
        }
        return isAuth;
    }


}
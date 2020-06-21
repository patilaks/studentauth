import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Subject, BehaviorSubject, observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl="http://3.6.91.229:8080/api";  
  isAuthunticated=false
  token;
  authorities;
  expiresInDuration=3600;
  tokenTimer: any;
  isadmin=new BehaviorSubject<any>(false)
  constructor(private http: HttpClient, public router: Router) { }

  LoginUser(username,password)
  {

    let loginUrl=this.baseUrl+"/authenticate"
    let auth={username:username,password:password}
    this.http.post(loginUrl,auth).subscribe((data)=>
    {
      const token=data['id_token']
      this.token=token
      let userinfo
      if(token)
      {

     
        const expiresInDuration =this.expiresInDuration;
        this.setAuthTimer(expiresInDuration);
        this.isAuthunticated=true 
        const now = new Date();
        const expirationdate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this.saveauthdata(token,expirationdate)

        this.getuserData()
        this.router.navigate(['/home'])
      }
    
    },
    error=>{
      console.log(error)
    })
  }
  saveauthdata(token:string,expirationDate:Date)
  {
     
    localStorage.setItem('token',token)
    localStorage.setItem("expiration", expirationDate.toISOString());
  }
  logoutuser()
  {
    localStorage.removeItem('token')
    localStorage.removeItem("expiration");
     this.isadmin.next(false)
    this.router.navigate(['/'])
    clearTimeout(this.tokenTimer);
  }
  getToken()
  {
    return this.token
  }
  getAuth()
  {
    return this.isAuthunticated
  }
  adminauth()
  {
    return this.isadmin
  }
  getuserData()
  { 
    let userdata;
     let geuserinformation=this.baseUrl+"/account";
     this.http.get(geuserinformation).subscribe(data=>{
     userdata=data
     this.authorities=userdata['authorities'][0]
     console.log(this.authorities)
     if(this.authorities==='ROLE_ADMIN')
     {
       this.isadmin.next(true)
     }
     else{
       this.isadmin.next(false)
     }
  })
  }
 setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutuser();
    }, duration * 1000);
  }

  autoauthuser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn / 1000);
    }
  }

    
  
  
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}

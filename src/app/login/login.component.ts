import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading=false;
    private authStatusSub:Subscription;

     constructor(private authservice:AuthService){}
     ngOnInit()
     {
     
     }
    onLogin(form:NgForm){
        if(form.invalid)
        {
            return; 
        }
        console.log(form.value);


        this.authservice.LoginUser(form.value.username,form.value.password)      
     
    }
    ngOnDestroy()
    {
      
    }

}

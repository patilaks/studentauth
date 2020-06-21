import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  isLoading=false;
  schoolsdata=[]
  private authStatusSub:Subscription;

   constructor(private schoolservice:SchoolService){}
   ngOnInit()
   {
    
      
        this.schoolservice.getnamesonly().subscribe(data=>{
         this.schoolsdata=data
         console.log(this.schoolsdata)
        })
   
   }
  onLogin(form:NgForm){
      if(form.invalid)
      {
          return; 
      }
      console.log(form.value);      
     
  }
  ngOnDestroy()
  {
    
  }

}

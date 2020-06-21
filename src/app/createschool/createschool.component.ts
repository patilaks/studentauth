import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SchoolService } from '../school.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-createschool',
  templateUrl: './createschool.component.html',
  styleUrls: ['./createschool.component.css']
})
export class CreateschoolComponent implements OnInit,AfterViewInit{
  isLoading=false;
  mode='create';
  schoolid
  schoold
  @ViewChild('f',{static:false})form:NgForm
  private authStatusSub:Subscription; 

   constructor(private schoolservice:SchoolService,private route:ActivatedRoute){}
   ngOnInit()
   {
    this.schoolservice.getallschool()

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id'))
      {
        this.mode='edit';
        this.schoolid=paramMap.get('id');
        this.isLoading=true;
        this.schoolservice.getsingle(this.schoolid).subscribe(Data=>{
        this.isLoading=false;
        console.log(Data)
        console.log(this.form)
        this.schoold={id:Data._id,schoolName:Data.schoolName,city:Data.city}
        this.form.setValue({schoolName:this.schoold.schoolName,city:this.schoolid.city})
       })
      } 
      else{
        this.mode='create';
        this.schoolid=null;
      }
   })
  }
  onLogin(form:NgForm){
      if(form.invalid)
      {
          return; 
      }
      if(this.mode=="create")
      {
        console.log(form.value);      
        this.schoolservice.createschool(form.value)
      }
      else
      {
          console.log(form.value)
          this.schoolservice.updateschool(form.value)
      }
  }
  ngAfterViewInit()
  {
  
  }

  
  ngOnDestroy()
  {
    
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SchoolService } from '../school.service';
import { StudentService } from '../student.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreatestudentComponent implements OnInit {
  isLoading=false;
  mode='create';
  schoolid
  schoold
  schoolsdata
  selectedValue: string;
  @ViewChild('f',{static:false})form:NgForm
  private authStatusSub:Subscription; 
  constructor(private schoolservice:SchoolService,private studentService:StudentService,private DatePipe:DatePipe) { }

  ngOnInit(): void {
        
    this.schoolservice.getnamesonly().subscribe(data=>{
      this.schoolsdata=data
      console.log(this.schoolsdata)
     })
  } 
  onLogin(formdata)
  {
    console.log(formdata.value)
    let updateddate=formdata.value.date
    console.log(this.DatePipe.transform(updateddate,"yyyy-MM-dd")); 
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     console.log(type,event.value)
  }
}

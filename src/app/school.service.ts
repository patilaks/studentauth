import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  baseUrl="http://3.6.91.229:8080/api";  
  isAuthunticated=false
  schooldatanames=new Subject<any>()
  names;
  constructor(private http:HttpClient, public router: Router) { 

  }
  createschool(sampledata)
  {
    const schoolurl=this.baseUrl+"/schools"
    const detailsofschool={school_name:sampledata.schoolName,address_line_1:sampledata.address_line_1,city:sampledata.city}
    this.http.post(schoolurl,sampledata).subscribe(data=>{
       console.log(data)
    })
  }

  getallschool()
  {
    const schoolnamesurl=this.baseUrl+"/schools"
    this.http.get(schoolnamesurl).subscribe(data=>{
             this.names=[...data]
             this.schooldatanames.next(this.names)
    })
  }
getnamesonly()
{
  this.getallschool()
  return this.schooldatanames.asObservable()
}
getsingle(id)
{
  const singleschoolurl=this.baseUrl+"/schools/"
  return this.http.get<any>(singleschoolurl+id)
}
updateschool(updateddata)
{
  const updateschoolurl=this.baseUrl+"/schools"
  updateddata={id:updateddata.id,schoolName:updateddata.schoolName,city:updateddata.city}
  this.http.put<any>(updateschoolurl,updateddata).subscribe(data=>{
    console.log(data)
  })
}


}

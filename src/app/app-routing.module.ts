import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { AuthGuard } from './auth.guard';
import { CreatestudentComponent } from './createstudent/createstudent.component';
import { SchoolComponent } from './school/school.component';
import { AdminGuard } from './admin.guard';
import { HomeComponent } from './home/home.component';
import { CreateschoolComponent } from './createschool/createschool.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'student',component:StudentComponent,canActivate:[AuthGuard]},
  {path:'createstudent',component:CreatestudentComponent,canActivate:[AuthGuard]},
  {path:'school',component:SchoolComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'createschool',component:CreateschoolComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'editschool/:id',component:CreateschoolComponent,canActivate:[AuthGuard,AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,AdminGuard]
})
export class AppRoutingModule { }

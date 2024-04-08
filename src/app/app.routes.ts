import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent},
   { path:'employee', component:DashboardComponent},
   { path:'addemployee', component:AddEmployeeComponent},
   { path:'editemployee/:id', component:EditEmployeeComponent},
   { path:'login', component:LoginComponent},
   { path:'register', component:RegisterComponent},
];

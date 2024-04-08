import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { gql } from 'graphql-tag';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.less'
})
export class AddEmployeeComponent implements OnInit {

  constructor(private apollo:Apollo, private router:Router){}
  ngOnInit(): void {
    try{
      if(localStorage.getItem('loginSucess')!=="Yes"){
        this.router.navigate(['/login'])
      }
    }catch(error){
  
      }
   
  }
  addEmployee(firstName:string,lastName:string, email:string, gender:string,salary:string):void{

    const ADD_EMPLOYEE = gql`mutation AddEmployee($firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
      addEmployee(first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, salary: $salary)
    }`;

    this.apollo.mutate<any>({
      mutation:ADD_EMPLOYEE ,
      variables:{
        firstName,
        lastName,
        email,
        gender,
        salary: parseFloat(salary)

        
      }
    }).subscribe(({data})=>{

      if(data.addEmployee==="Employee added sucessfully"){
        console.log(data)
        alert('Employee added sucessfully')
      }else if(((data.addEmployee).split(' ').includes('duplicate'))){
        alert('Employee Email Already Exist')
      }else{
        console.log(data.addEmployee)
        alert('Server error try later')
      }
      
     
     
    })
    
  }

}
 


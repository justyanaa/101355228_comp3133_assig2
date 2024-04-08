import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { query } from 'express';
import {gql} from 'graphql-tag'
@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.less'
})
export class EditEmployeeComponent implements OnInit {
  constructor(private apollo:Apollo,private router:Router){}
  employee: any = {};
  @Input() id:string=''
  
  ngOnInit(): void {

    try{
      if(localStorage.getItem('loginSucess')!=="Yes"){
        this.router.navigate(['/login'])
      }
    }catch(error){
  
      }

    const SEARCH_BY_ID = gql`query SearchById($searchByIdId: String!) {
      searchById(id: $searchByIdId) {
        _id
        email
        first_name
        gender
        salary
        last_name
      }
    }`;
    this.apollo.watchQuery<any>({
      query:SEARCH_BY_ID,
      variables: { searchByIdId: this.id }
    }
    ).valueChanges.subscribe(({data})=>{
      this.employee = data.searchById
      console.log(this.employee)
    })


  }
  
  

  



  editEmployee(id:string, firstName:string, lastName:string, email:string, gender:string, salary:string){
      const EDIT_EMPLOYEE = gql`mutation UpdateEmployeeById($id: String!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
        updateEmployeeById(_id: $id, first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, salary: $salary)
      }`;


    this.apollo.mutate<any>({
      mutation:EDIT_EMPLOYEE,
      variables:{
        id,
        firstName,
        lastName,
        email,
        gender,
        salary: parseFloat(salary)
      }
    }).subscribe(({data})=>{
      console.log(data)
      alert(data.updateEmployeeById)
    })
  }

}

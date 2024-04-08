import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { gql} from 'graphql-tag'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent implements OnInit{
 
  constructor(private apollo:Apollo, private router:Router){}
  employeeData:any[]=[]
  ngOnInit(): void {
    try{
    if(localStorage.getItem('loginSucess')!=="Yes"){
      this.router.navigate(['/login'])
    }
  }catch(error){

    }

    const GET_EMPLOYEE = gql `query GetAllEmployee {
      getAllEmployee {
        _id
        email
        first_name
        gender
        last_name
        salary
      }
    }`;
    this.apollo.watchQuery<any>({
      query:GET_EMPLOYEE

    }).valueChanges.subscribe(({data})=>{
      console.log(data.getAllEmployee)
      this.employeeData = data.getAllEmployee
    })
    
  }

  deleteEmployee(id:string):void{

    const DELETE_EMPLOYEE = gql`mutation DeleteEmployeeById($id: String!) {
      deleteEmployeeById(_id: $id)
    }`;
    this.apollo.mutate<any>({
      mutation:DELETE_EMPLOYEE,
      variables:{
        id
      }
    }).subscribe(({data})=>{
      console.log(data)
      alert(data.deleteEmployeeById)
      location.reload()
      
    })

  }



}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {gql} from 'graphql-tag'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent implements OnInit {
  constructor(private apollo:Apollo, private location:Location, private router:Router){
  }
  ngOnInit(): void {
    try{
      if(localStorage.getItem('loginSucess')==="Yes"){
        this.router.navigate(['/'])
      }
    }catch(error){
  
      }
  }
  register(username:string, password:string, email:string):void{
    const ADD_USER = gql `mutation SignUp($username: String!, $email: String!, $password: String!) {
      signUp(username: $username, email: $email, password: $password)
    }`;
    this.apollo.mutate<any>({
      mutation:ADD_USER,
      variables:{
        username,
        email,
        password

      }
    }).subscribe(({data})=>{  
      console.log(data)
      alert(data.signUp)
    })
   
  }

}

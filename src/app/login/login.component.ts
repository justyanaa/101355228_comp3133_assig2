import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';


import {gql} from 'graphql-tag'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})


  
export class LoginComponent  implements OnInit{
  constructor(private apollo:Apollo, private location:Location,private router:Router){}
  ngOnInit(): void {
    try{
      if(localStorage.getItem('loginSucess')==="Yes"){
        this.router.navigate(['/'])
      }
    }catch(error){
  
      }
  }

  
 
  login(username:string, password:string){
    const LOGIN = gql`query Query($loginUserUsername2: String!, $loginUserPassword2: String!) {
      loginUser(username: $loginUserUsername2, password: $loginUserPassword2)
    }`;
    this.apollo.watchQuery<any>({
      query:LOGIN,
      variables:{
        loginUserUsername2: username,
        loginUserPassword2: password
      }
    }).valueChanges.subscribe(({data})=>{
      console.log(data)
      alert(data.loginUser)
      if(data.loginUser==="Sucessful"){
        localStorage.setItem('loginSucess', "Yes")
      }
    })


  }
  
 
}


import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  loginSucees : string="";
  ngOnInit(): void {
    try {
      localStorage.getItem("loginSucess")=="Yes"? this.loginSucees="Yes" : this.loginSucees="No"
    } catch (error) {
      
    }
    
  }
  

  
  title = '101355228_comp3133_assig2';
  logout():void{
    localStorage.removeItem('loginSucess')
    location.reload();

  }
}

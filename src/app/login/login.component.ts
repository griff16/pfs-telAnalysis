import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Config } from '../setting/config';
import { Common } from '../util/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserName: string;
  Password: string;
  model;
  lan;

  constructor(private router: Router,private http: HttpClient,private config: Config, private common: Common) {
    this.common.reload()
    this.lan = this.common.languageSetting();
  }

  ngOnInit() { }

  login(){
    //検証
    let result:string;
    this.http.get("http://localhost:8086/login?username=" + this.UserName + "&password=" + this.Password)
    .subscribe(function(resp){
      if(resp == "0"){
        console.log("login success");
        this.router.navigate(['/index']);
      }else{
        console.log("login failure");
      }
    }
    );


  }

}

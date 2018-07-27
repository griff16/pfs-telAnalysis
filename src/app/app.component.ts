import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Config } from './setting/config';
import { Common } from './util/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ITPro.app';

  lan;
  lansetting;
  page;

  constructor(private config: Config, private common: Common, private router: Router){
    this.page = sessionStorage.getItem("currentPage");
    if(this.page == null){
      this.page = "index";
      sessionStorage.setItem("currentPage","index");
    }
    
    this.lan = this.common.languageSetting();
  }

  pageChange(page: string){
    this.page = page;
    sessionStorage.setItem("currentPage",page);
    this.router.navigate(['/'+page]);
  }
}

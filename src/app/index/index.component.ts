import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Config } from '../setting/config';
import { Common } from '../util/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  model;
  lan;
  
  constructor(private config: Config, private common: Common, private route: ActivatedRoute,) { 
    this.common.reload()
    this.lan = this.common.languageSetting();
  }

  ngOnInit() { 
    this.model = {
      class:1,
      time:1,
      unit:1,
      type:1,
      order:1
    }
  }

  OnChange(type: string, value: Number){
    console.log(type + "--" + value);
    if(type == "class") this.model.class = value;
    if(type == "time") this.model.time = value;
    if(type == "unit") this.model.unit = value;
    if(type == "type") this.model.type = value;
    if(type == "order") this.model.order = value;    
  }

  search(){
    console.log(this.model);
  }
}

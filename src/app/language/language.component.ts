import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) {
    
   }

  ngOnInit() {
    let lan = this.route.snapshot.paramMap.get('lan');
    localStorage.setItem("language",lan)
    
    sessionStorage.setItem("reload","true")

    let currentPage = sessionStorage.getItem("currentPage");

   this.router.navigate(['/'+currentPage]);
  }

}

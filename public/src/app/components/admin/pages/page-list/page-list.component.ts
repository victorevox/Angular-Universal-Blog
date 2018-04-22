import { Component, OnInit } from '@angular/core';
import { IPage } from "@shared/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  public pages: Array<any> = [
    { name: "Contact" },
    { name: "Home" }
  ]

  constructor(private _router: Router) {
  
  }

  ngOnInit() {
  }

  editPage(page: IPage) {
    this._router.navigate([`admin/pages/${page.name}/edit`])
  }
}
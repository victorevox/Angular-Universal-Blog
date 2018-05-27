import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { IResourceListResponse, IPage } from "@shared/interfaces";

@Component({
  selector: 'contact',
  templateUrl: "./contact.component.html"
})
export class ContactComponent implements OnInit {
  public message: string;

  public page: IPage;

  constructor(private _http: HttpClient) {
    this._http.get(`api/page?filter[where][name]=Contact`).subscribe((response: IResourceListResponse) => {
      try {
        let data = response;
        if(data) {
          let page = data.documents;
          page = page instanceof Array ? page[0] : page instanceof Object ? page : null;
          this.page = page;
        } 
      } catch (error) {
        console.log(error);
      }
    })
  }

  ngOnInit() {
  }
}
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from './../../services';
import { IResourceListResponse, IPage } from "./../../interfaces";

@Component({
  selector: 'contact',
  templateUrl: "./contact.component.html"
})
export class ContactComponent implements OnInit {
  public message: string;

  public page: IPage;

  constructor(private _http: CustomHttpService) {
    this._http.get(`api/page?filter[where][name]=Contact`).subscribe(response => {
      try {
        let data:IResourceListResponse = response.json();
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
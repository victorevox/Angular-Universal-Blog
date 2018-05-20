import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IPage, IResourceListResponse } from "@shared/interfaces"
import { CustomHttpService } from "@app/services";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertsService } from '@app/services/alerts.service';
import { NgForm, NgModel } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageEditComponent implements OnInit {

  public page: IPage = null;

  public editor;
  public pageContent: string = '';

  constructor(private _http: CustomHttpService, private _cDr: ChangeDetectorRef, private _router: Router, private _notifications: NotificationsService, private _route: ActivatedRoute, private _alerts: AlertsService) {
    this._route.params.subscribe(params => {
      if (params && params.name) {
        let name = params.name;
        this._http.get(`/api/page?filter[where][name]=${name}`).subscribe(response => {
          let data: IResourceListResponse = <IResourceListResponse>response.json();
          if (data) {
            let page = data.documents;
            page = page instanceof Array ? page[0] : page instanceof Object ? page : null;
            this.page = page;
            this._cDr.markForCheck();
            console.log(page);
          } else {
            this._alerts.create("error", "Resource not found", "Not Found");
            this.goToList();
          }
        }, err => {
          console.log(err);
          this._alerts.create("error", "Something went wrong", "Error");
        })
      } else {
        this._alerts.create("error", "Not parameters given", "Error");
        this.goToList();
      }
    })
  }

  ngOnInit() {
  }

  submit(event, form: NgForm) {
    event.preventDefault();
    if (!form.valid) {
      return this._alerts.create("error", "Veryfy all required fields", "Invalid")
    }
    this._http.put(`/api/page/${this.page._id}`, form.value).subscribe(response => {
      console.log(response);
      let data: IResourceListResponse = <IResourceListResponse>response.json();
      if (data) {
        this._cDr.markForCheck();
      } else {
        this._alerts.create("error", "Resource not found", "Not Found");
        this.goToList();
      }
      this._notifications.success("Page updated");
    }, err => {
      console.error(err);
      this._notifications.error("Error", "Something went wrong");
    })
  }

  onEditorChange(event, textarea: NgModel) {
    console.log("on editor change", event);
    this.page.content = event;
    // textarea.update.emit(event);
    // textarea.model = event;
    // textarea.viewModel = event;
    this._cDr.detectChanges();
    console.log(textarea);
    
  }

  goToList() {
    this._router.navigate(["admin/pages"]);
  }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }

}

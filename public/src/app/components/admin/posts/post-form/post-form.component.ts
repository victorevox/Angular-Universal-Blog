import { Component, OnInit, ComponentFactoryResolver, Injector, ViewChild, ElementRef, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms"
import { QuillEditorComponent } from "ngx-quill-editor/quillEditor.component";
import { AlertsService } from '@app/services/alerts.service';
import { NotificationsService } from "angular2-notifications"
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { IResourceListResponse, IPost } from '@shared/interfaces';
import { GlobalsService } from '@app/services';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFormComponent implements OnInit {

  public editor;

  public editorOptions = {
    placeholder: "insert content..."
  };
  public post: IPost = {
    _id: null,
    title: '',
    content: ''
  };

  @ViewChild('editorContainer') editorContainer: ElementRef;

  public enableForm = false; //Control form rendering, prevent server side rendering as it fails

  public formType: FORM_TYPES = FORM_TYPES.CREATE;
  public postToEdit: string = null;

  constructor(private _globals: GlobalsService, private _router: Router, private _notifications: NotificationsService, private _route: ActivatedRoute, private _factory: ComponentFactoryResolver, private _injector: Injector, private _renderer: Renderer2, private _alerts: AlertsService, private _http: HttpClient, private _cDr: ChangeDetectorRef) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (/posts\/(.*)\/edit/.test(this._router.routerState.snapshot.url)) {
          console.log("Youre editing");
          if (this.postToEdit) {
            this.formType = FORM_TYPES.EDIT;
            this._http.get(`api/post/${this.postToEdit}`).subscribe((response: IResourceListResponse) => {
              try {
                let data = response;
                if (data) {
                  let post = data.documents;
                  post = post instanceof Array ? post[0] : post instanceof Object ? post : null;
                  this.post = post;
                  this._cDr.markForCheck();
                  console.log(post);
                } else {
                  this._alerts.create("error", "Resource not found", "Not Found");
                  this.goToList();
                }
              } catch (error) {
                this._alerts.create("error", "There was an error while fetching data", "Error");
                this.goToList();
                console.log(response);
              }
            })
          }
        }
      }
    })
    this._route.params.subscribe(params => {
      this.postToEdit = params.id;
    })
  }

  ngOnInit() {
    if (this._globals.isBrowser()) { //if browser then , ennable form
      this.enableForm = true;
      // this.addForm();
    }
  }

  submit(event, form: NgForm) {
    event.preventDefault();
    if (!form.valid) {
      return this._alerts.create("error", "Veryfy all required fields", "Invalid")
    }
    switch (this.formType) {
      case FORM_TYPES.CREATE:
        this._http.post('/api/post', form.value).subscribe(response => {
          console.log(response);
          this._notifications.success("Post created");
          this._router.navigate(['admin/posts']);
        }, err => {
          console.error(err);
          this._notifications.error("Error", "Something went wrong");
        })
        break;
      case FORM_TYPES.EDIT:
        this._http.put(`/api/post/${this.postToEdit}`, form.value).subscribe(response => {
          console.log(response);
          this._notifications.success("Post updated");
        }, err => {
          console.error(err);
          this._notifications.error("Error", "Something went wrong");
        })
        break;
      default:
        break;
    }
    console.log(form)
  }

  goToList() {
    this._router.navigate(["admin/posts"]);
  }

  // addForm() { //it was supossed to render squill editor dynamic but doesnt work
  //   const factory = this._factory.resolveComponentFactory(QuillEditorComponent);
  //   const component = factory.create(this._injector);
  //   component.instance.options = this.editorOptions;
  //   component.instance.change.subscribe(change => {
  //     console.log(change);
  //   });
  //   component.changeDetectorRef.detectChanges();

  //   const componentContent = component.location.nativeElement;
  //   this._renderer.appendChild(this.editorContainer, componentContent);
  // }

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

enum FORM_TYPES {
  CREATE = "Create",
  EDIT = "Edit"
}
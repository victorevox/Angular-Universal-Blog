import { Component, OnInit, ComponentFactoryResolver, Injector, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GlobalsService } from "./../../../../services";
import { QuillEditorComponent } from "ngx-quill-editor/quillEditor.component";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };
  @ViewChild('editorContainer') editorContainer: ElementRef;

  public enableForm = false; //Control form rendering, prevent server side rendering as it fails

  constructor(private _globals: GlobalsService, private _factory: ComponentFactoryResolver, private _injector: Injector, private _renderer: Renderer2) { }

  ngOnInit() {
    if (this._globals.isBrowser()) { //if browser then , ennable form
      this.enableForm = true;
      // this.addForm();
    }
  }

  addForm() {
    const factory = this._factory.resolveComponentFactory(QuillEditorComponent);
    const component = factory.create(this._injector);
    component.instance.options = this.editorOptions;
    component.instance.change.subscribe(change => {
      console.log(change);
    });
    component.changeDetectorRef.detectChanges();

    const componentContent = component.location.nativeElement;
    this._renderer.appendChild(this.editorContainer, componentContent);
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

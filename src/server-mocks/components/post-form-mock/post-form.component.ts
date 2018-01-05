import { Component, OnInit, ComponentFactoryResolver, Injector, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GlobalsService } from "./../../../app/services";

export class PostFormComponent {
  constructor(parameters) {
    
  }
}

// @Component({
//   selector: 'app-post-form',
//   templateUrl: './post-form.component.html',
//   styleUrls: ['./post-form.component.css']
// })
// export class PostFormComponent implements OnInit {

//   public editor;
//   public editorContent = `<h3>I am Example content</h3>`;
//   public editorOptions = {
//     placeholder: "insert content..."
//   };

//   public enableForm = false; //Control form rendering, prevent server side rendering as it fails

//   constructor(private _globals: GlobalsService, private _factory: ComponentFactoryResolver, private _injector: Injector, private _renderer: Renderer2) { }

//   ngOnInit() {
//     if (this._globals.isBrowser()) { //if browser then , ennable form
//       this.enableForm = true;
//       // this.addForm();
//     }
//   }

//   onEditorBlured(quill) {
//     console.log('editor blur!', quill);
//   }

//   onEditorFocused(quill) {
//     console.log('editor focus!', quill);
//   }

//   onEditorCreated(quill) {
//     this.editor = quill;
//     console.log('quill is ready! this is current quill instance object', quill);
//   }

//   onContentChanged({ quill, html, text }) {
//     console.log('quill content is changed!', quill, html, text);
//   }


// }

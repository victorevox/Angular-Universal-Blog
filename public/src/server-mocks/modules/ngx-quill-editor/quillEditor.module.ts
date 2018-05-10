import { NgModule } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { QuillEditorComponent } from "./test";
// import { QuillEditorComponent as QuillEditorComponentMocked } from "./quillEditor.component";
// // import { QuillEditorComponent as QuillEditorComponentOriginal } from "ngx-quill-editor/quillEditor.component";
// var QuillEditorComponentOriginal;

// if(isPlatformBrowser) {
//     QuillEditorComponentOriginal = require("ngx-quill-editor/quillEditor.component")
// }

// export function quillEditorGetter(){
//     if(isPlatformBrowser) {
//         return require("ngx-quill-editor/quillEditor.component");
//     } else {
//         return QuillEditorComponentMocked;
//     }
// };

// var QuillEditorComponentVar = isPlatformBrowser && QuillEditorComponentOriginal || QuillEditorComponentMocked;

export const declarations = [
    QuillEditorComponent
]

@NgModule({
    declarations: declarations,
    exports: declarations
})

export class QuillEditorModule { }

// export const QuillEditorComponent = QuillEditorComponentVar;
export { QuillEditorComponent } from "./test";


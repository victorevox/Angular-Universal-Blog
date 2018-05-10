import { isPlatformBrowser } from "@angular/common";
import { QuillEditorComponent as QuillEditorComponentMocked } from "./quillEditor.component";
// import { QuillEditorComponent as QuillEditorComponentOriginal } from "ngx-quill-editor/quillEditor.component";
var QuillEditorComponentOriginal;

if(isPlatformBrowser) {
    QuillEditorComponentOriginal = require("ngx-quill-editor/quillEditor.component").QuillEditorComponent
}

export function quillEditorGetter(){
    if(isPlatformBrowser) {
        return require("ngx-quill-editor/quillEditor.component");
    } else {
        return QuillEditorComponentMocked;
    }
};

// var QuillEditorComponentVar = 
export const QuillEditorComponent = isPlatformBrowser && QuillEditorComponentOriginal || QuillEditorComponentMocked;
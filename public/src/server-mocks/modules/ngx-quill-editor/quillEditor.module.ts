import { NgModule } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { QuillEditorComponent } from "./quillEditor.component";

export const declarations = [
    QuillEditorComponent
]

@NgModule({
    declarations: declarations,
    exports: declarations
})

export class QuillEditorModule { }

export { QuillEditorComponent };


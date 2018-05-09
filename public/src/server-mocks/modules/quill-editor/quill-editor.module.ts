import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';

export interface CustomOption {
    import: string;
    whitelist: Array<any>;
}

@Component({
    selector: 'quill-editor',
    template: ''
})
export class QuillEditorComponent {
    @Input() theme: string;
    @Input() modules: { [index: string]: Object };
    @Input() readOnly: boolean;
    @Input() placeholder: string;
    @Input() maxLength: number;
    @Input() minLength: number;
    @Input() required: boolean;
    @Input() formats: string[];
    @Input() style: any = {};
    @Input() strict: boolean = true;
    @Input() scrollingContainer: HTMLElement | string;
    @Input() bounds: HTMLElement | string;
    @Input() customOptions: CustomOption[] = [];
    @Input() options: Object;


    @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
    @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
    @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
}

@NgModule({
    declarations: [
        QuillEditorComponent
    ],
    exports: [
        QuillEditorComponent
    ]
})
export class QuillEditorModule { }


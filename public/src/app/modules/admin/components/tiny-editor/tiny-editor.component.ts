import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GlobalsService } from "@app/modules/_shared/services";
import { Promise } from 'mongoose';
import { setTimeout } from 'timers';

declare const tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TinyEditorComponent implements OnInit, AfterViewInit {

  public id = "";

  public content: string;

  @Output('change') $content: EventEmitter<string> = new EventEmitter();
  @Input('value') value: string;

  constructor(private _globals: GlobalsService, private _cDr: ChangeDetectorRef) {
    this.id = btoa(Math.random().toString()).substring(0, 5);
  }

  @ViewChild('textarea') textarea: ElementRef;

  ngOnInit() {
  }

  onTextAreaChange($event) {
    console.log($event)
  }

  ngAfterViewInit() {
    if (this._globals.isBrowser()) {
      import('tinymce/tinymce.min.js').then(module => {
        import('tinymce/plugins/code/plugin.min.js').then(module => {
          import('tinymce/themes/modern/theme.js' /* webpackChunkName = "tinymce" */).then(() => {
            // import('tinymce/skins/lightgray/content.inline.min.css' /* webpackChunkName = "tinymce" */).then(() => {

            // })
            let tiny_instance = tinymce.init({
              selector: `#${this.id}`,
              plugins: "code",
              inline: true,
              init_instance_callback: (editor) => {
                editor.setContent(this.value);
                editor.on('change' , (event, a) => {
                  let editor = event.target;
                  if(editor) {
                    let content = editor.getContent();
                    this.$content.emit(content);
                  }
                  console.log(event);
                })
                
              }
              
            });


            // setInterval(() => {
            //   console.log(this.textarea.nativeElement);
            // }, 1000)

          })
        })
      })
    }
  }

}
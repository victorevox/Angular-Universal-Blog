import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminCommonModule } from "./admin.common.module";
import { DashboardComponent, PostListComponent, PostFormComponent } from "./components";
import { PageEditComponent } from "./pages";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { QuillEditorModule } from 'ngx-quill-editor';
import { platform } from "./../../../environments/platform";
import { AdminRoutingmodule } from './admin-routing.module';

var declarations = [
    // AdminComponent,
    // SidebarComponent,
    // DashboardComponent,
    PageEditComponent,
    PostFormComponent
    // PostListComponent,
]

@NgModule({
    declarations: declarations,
    imports: [
        CommonModule,
        FormsModule,
        QuillEditorModule,
        AdminCommonModule,
    ],
    exports: [
        RouterModule
    ]
})
export class AdminModule {

}
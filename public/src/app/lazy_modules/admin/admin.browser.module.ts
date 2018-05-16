import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminComponent } from "./../../pages";
import { AdminAuthGuard } from "./../../guards";
import { AdminCommonModule } from "./admin.common.module";
// import { SidebarComponent } from "./../../components";
import { DashboardComponent, PostListComponent, PostFormComponent , PageListComponent, PageEditComponent } from "./../../components/admin";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { QuillEditorModule } from 'ngx-quill-editor';
import { platform } from "./../../../environments/platform";

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
        RouterModule.forChild([
            {
                path: '', component: AdminComponent,/*  pathMatch: 'full', */
                canActivate: [AdminAuthGuard],
                children: [
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'posts', component: PostListComponent },
                    { path: 'posts/create', component: PostFormComponent },
                    { path: 'posts/:id/edit', component: PostFormComponent },
                    { path: 'pages', component: PageListComponent },
                    { path: 'pages/:name/edit', component: PageEditComponent },
                ]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
    // providers: [
    //     AdminAuthGuard
    // ]
})
export class AdminModule {

}
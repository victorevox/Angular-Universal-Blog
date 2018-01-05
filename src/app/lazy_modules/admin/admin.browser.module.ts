import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminComponent } from "./../../pages";
import { AdminAuthGuard } from "./../../guards";
import { AdminCommonModule } from "./admin.common.module";
// import { SidebarComponent } from "./../../components";
import { DashboardComponent, PostFormComponent, PostListComponent, PageListComponent, PageEditComponent } from "./../../components/admin";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { QuillEditorModule } from 'ngx-quill-editor';
import { platform } from "./../../../environments/platform";


@NgModule({
    declarations: [
        // AdminComponent,
        // SidebarComponent,
        // DashboardComponent,
        PostFormComponent,
        PageEditComponent
        // PostListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        QuillEditorModule,
        AdminCommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent,/*  pathMatch: 'full', */
                // redirectTo: "/admin/dashboard",
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
    // providers: [
    //     AdminAuthGuard
    // ]
})
export class AdminModule {

}
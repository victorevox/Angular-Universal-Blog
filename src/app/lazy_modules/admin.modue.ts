import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminComponent } from "./../pages";
import { AdminAuthGuard } from "./../guards";
import { SidebarComponent } from "./../components";
import { DashboardComponent, PostFormComponent, PostListComponent } from "./../components/admin";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { QuillEditorModule } from 'ngx-quill-editor';
import { platform } from "./../../environments/platform";
// import { QuillEditorComponent } from "ngx-quill-editor/quillEditor.component";



const platformModules = [];

if(!platform.server) {
    // platformModules.push(QuillEditorModule)
}

@NgModule({
    declarations: [
        AdminComponent,
        SidebarComponent,
        DashboardComponent,
        PostFormComponent,
        PostListComponent,
    ],
    exports: [
        // QuillEditorComponent
    ],
    entryComponents: [
        // QuillEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        QuillEditorModule,
        ...platformModules,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent,/*  pathMatch: 'full', */
                // redirectTo: "/admin/dashboard",
                children: [
                    { path: 'dashboard', component: DashboardComponent },
                    {
                        path: 'posts', component: PostListComponent,
                        // children: [

                        // ]
                    },
                    { path: 'posts/create', component: PostFormComponent },
                    { path: 'posts/:id/edit', component: PostFormComponent }
                ]
            },
            // {
            //     path: 'test', component: AdminComponent,
            //     children:  [
            //         { path: 'dashboard', component: DashboardComponent }
            //     ]
            // }
            // { path: 'dashboard', loadChildren:  }
        ])
    ],
    providers: [
        AdminAuthGuard
    ]
})
export class AdminModule {

}
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminComponent } from "./../../pages";
import { AdminAuthGuard } from "./../../guards";
import { SidebarComponent } from "./../../components";
import { DashboardComponent, PostFormComponent, PostListComponent } from "./../../components/admin";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AdminCommonModule } from "./admin.common.module";
import { platform } from "./../../../environments/platform";


@NgModule({
    declarations: [
        // AdminComponent,
        // SidebarComponent,
        // DashboardComponent,
        // // PostFormComponent,
        // PostListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminCommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent,/*  pathMatch: 'full', */
                // redirectTo: "/admin/dashboard",
                children: [
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'posts', component: PostListComponent },
                    { path: 'posts/create', component: DashboardComponent },
                    { path: 'posts/:id/edit', component: DashboardComponent }
                ]
            },
        ])
    ],
    // providers: [
    //     AdminAuthGuard
    // ]
})
export class AdminServerModule {

}
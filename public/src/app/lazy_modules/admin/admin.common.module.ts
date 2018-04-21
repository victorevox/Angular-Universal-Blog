import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminComponent } from "./../../pages";
import { AdminAuthGuard } from "./../../guards";
import { SidebarComponent, TinyEditorComponent } from "./../../components";
import { DashboardComponent, PostListComponent, PageListComponent } from "./../../components/admin";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { platform } from "./../../../environments/platform";


@NgModule({
    declarations: [
        AdminComponent,
        SidebarComponent,
        DashboardComponent,
        PostListComponent,
        PageListComponent,
        TinyEditorComponent
    ],
    exports: [
        AdminComponent,
        SidebarComponent,
        DashboardComponent,
        PostListComponent,
        TinyEditorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([])
    ],
    providers: [
        AdminAuthGuard
    ]
})
export class AdminCommonModule {

}
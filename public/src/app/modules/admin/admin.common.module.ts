import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminComponent } from "./admin.component";
import { AdminAuthGuard } from "./guards";
import { SidebarComponent, TinyEditorComponent } from "./components";
import { DashboardComponent, PostListComponent } from "./components";
import { PageListComponent } from "./pages";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { platform } from "./../../../environments/platform";
import { AdminRoutingmodule } from './admin-routing.module';


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
        AdminRoutingmodule
    ],
    providers: [
        AdminAuthGuard,
        RouterModule
    ]
})
export class AdminCommonModule {

}
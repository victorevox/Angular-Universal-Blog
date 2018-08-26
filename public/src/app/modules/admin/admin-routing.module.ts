import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent, PostFormComponent, PostListComponent } from "./components";
import { PageListComponent, PageEditComponent } from "./pages";
import { AdminAuthGuard } from "./guards/admin-auth.guard";

const routes: Routes = [
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
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingmodule {}
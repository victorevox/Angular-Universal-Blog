import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LazyComponent } from "./pages";

const routes: Routes = [
    { path: '', component: LazyComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class LazyRoutingModule {
}
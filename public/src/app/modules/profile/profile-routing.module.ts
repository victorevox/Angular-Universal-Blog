import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./pages";

const routes: Routes = [
    { path: '', component: ProfileComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ProfileRoutingModule {}
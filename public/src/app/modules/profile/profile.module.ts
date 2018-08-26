import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ProfileComponent } from "./pages";
import { UserImageProfileComponent } from "./components";
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '@appsrc/app/modules/_shared/shared.module';

@NgModule({
    declarations: [
        ProfileComponent,
        UserImageProfileComponent,
    ],
    imports: [
        SharedModule,
        ProfileRoutingModule
    ]
})
export class ProfileModule {

}
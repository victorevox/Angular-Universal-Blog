import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ProfileComponent } from "./../pages/profile/profile.component";
import { UserImageProfileComponent } from "./../components";

@NgModule({
    declarations: [
        ProfileComponent,
        UserImageProfileComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: ProfileComponent, pathMatch: 'full' }
        ])
    ]
})
export class ProfileModule {

}
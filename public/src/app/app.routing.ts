import { Route } from "@angular/router";
import { ContactComponent, HomeComponent, AuthComponent } from "./pages";
import { UserAuthGuard } from "./guards";
import { platform } from "./../environments/platform";
import { PostListingComponent } from "./components";

export const ROUTES = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'contact', component: ContactComponent },
    { path: 'authenticate', component: AuthComponent },
    // { path: 'api/authentication/facebook/callback', component: AuthComponent },
    { path: 'posts', component: PostListingComponent },
    { path: 'lazy', loadChildren: './modules/lazy/lazy.module#LazyModule' },
    { path: 'profile', canActivate: [UserAuthGuard], loadChildren: './modules/profile/profile.module#ProfileModule' },
    { path: 'admin', loadChildren: './modules/admin/admin.browser.module#AdminModule' },
    { path: '*', component: AuthComponent },
];  
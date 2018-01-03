import { Route } from "@angular/router";
import { ContactComponent, HomeComponent, AuthComponent } from "./pages";
import { UserAuthGuard } from "./guards";
// import { AuthenticationComponent } from "./components";

export const ROUTES: Array<Route> = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'contact', component: ContactComponent },
    { path: 'authenticate', component: AuthComponent },
    { path: 'lazy', loadChildren: './lazy_modules/lazy.module#LazyModule' },
    { path: 'profile', canActivate: [UserAuthGuard] , loadChildren: './lazy_modules/profile.module#ProfileModule' },
    { path: 'admin' , loadChildren: './lazy_modules/admin.modue#AdminModule' },
]
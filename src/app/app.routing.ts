import { Route } from "@angular/router";
import { ContactComponent, HomeComponent, AuthComponent } from "./pages";
// import { AuthenticationComponent } from "./components";

export const ROUTES: Array<Route> = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'contact', component: ContactComponent },
    { path: 'authenticate', component: AuthComponent },
    { path: 'lazy', loadChildren: './lazy_modules/lazy.module#LazyModule' },
    { path: 'profile', loadChildren: './lazy_modules/profile.module#ProfileModule' },
]
import { NavbarComponent } from "./navbar.component/navbar.component";
import { LazyComponent } from "./lazy.component/lazy.component";
import { CounterComponent } from "./counter.component/counter.component";
import { AuthenticationComponent } from "./authentication.component/authentication.component";
import { UserImageProfileComponent } from "./profile";
import { SidebarComponent } from "./admin";

export { 
    NavbarComponent,
    CounterComponent,
    AuthenticationComponent,
    LazyComponent,
    UserImageProfileComponent,
    SidebarComponent
}

export const BASE_COMPONENTS = [
    NavbarComponent,
    CounterComponent,
    AuthenticationComponent
]
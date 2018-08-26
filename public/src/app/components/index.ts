import { NavbarComponent } from "./navbar/navbar.component";
import { CounterComponent } from "./counter/counter.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { PostListingComponent } from "./posts/post-listing.component/post-listing.component";

export { 
    NavbarComponent,
    CounterComponent,
    AuthenticationComponent,
    PostListingComponent,
}

export const BASE_COMPONENTS = [
    NavbarComponent,
    CounterComponent,
    PostListingComponent,
    AuthenticationComponent
]
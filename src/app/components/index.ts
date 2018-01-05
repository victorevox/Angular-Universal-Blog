import { NavbarComponent } from "./navbar.component/navbar.component";
import { LazyComponent } from "./lazy.component/lazy.component";
import { CounterComponent } from "./counter.component/counter.component";
import { AuthenticationComponent } from "./authentication.component/authentication.component";
import { UserImageProfileComponent } from "./profile";
import { SidebarComponent } from "./admin";
import { PostListingComponent } from "./posts/post-listing.component/post-listing.component";
import { TinyEditorComponent } from "./tiny-editor/tiny-editor.component";

export { 
    NavbarComponent,
    CounterComponent,
    AuthenticationComponent,
    LazyComponent,
    UserImageProfileComponent,
    SidebarComponent,
    PostListingComponent,
    TinyEditorComponent
}

export const BASE_COMPONENTS = [
    NavbarComponent,
    CounterComponent,
    PostListingComponent,
    AuthenticationComponent
]
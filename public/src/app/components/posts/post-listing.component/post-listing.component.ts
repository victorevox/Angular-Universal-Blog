import { NgModule, Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router, NavigationEnd } from "@angular/router";
import { AuthenticationService, CustomHttpService } from '@app/services';
import { IPost, IResourceListResponse, IAuthenticationEvent } from "@shared/interfaces";
import { NavigableLink } from "@app/interfaces";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-post-listing',
    templateUrl: `./post-listing.component.html`
})
export class PostListingComponent {

    public posts: Array<IPost> = [];


    constructor(private _router: Router, private _authService: AuthenticationService, private _http: CustomHttpService, private _chandDetectorRef: ChangeDetectorRef) {
        this._http.get('/api/post').subscribe(response => {
            try {
                let data: IResourceListResponse = <IResourceListResponse>response.json()
                this.posts = data.documents;
                this._chandDetectorRef.markForCheck();                
                console.log(this.posts);
            } catch (error) {
                console.log(error);
            }
        })
        this._router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this._chandDetectorRef.markForCheck();
            }
        })
    }

}
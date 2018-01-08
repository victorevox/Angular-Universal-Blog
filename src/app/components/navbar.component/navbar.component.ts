import { NgModule, Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router, NavigationEnd } from "@angular/router";
import { AuthenticationService } from './../../services';
import { IAuthenticationEvent } from "./../../services/authentication.service";
import { NavigableLink } from "./../../interfaces";
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-navbar',
    templateUrl: `./navbar.component.html`,
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    public menuState = false;
    public showSearch = false;
    public mobileToggle = false;
    public links: NavigableLink[] = [
        {
            name: "Contact",
            url: "/contact"
        },
        {
            name: "Posts",
            url: "/posts"
        }
    ]

    public get user() {
        console.log(this._authService.getUser());
        return this._authService.getUser();
    }

    public isAdminDashboard() {
        // let is = this._router.isActive("admin", false);
        let result = /admin\//.test(this._router.routerState.snapshot.url);
        console.log(result);
        return result;
    }

    public toggleMobile(event) {
        console.log(this.mobileToggle);
        
        this.mobileToggle =! this.mobileToggle;
    }

    public isAdmin() {
        if(!this.user) return false;
        return this._authService.isAdmin();
    }

    constructor(private _router: Router, private _authService: AuthenticationService, private _chandDetectorRef: ChangeDetectorRef) {
        this._authService.events.subscribe((event: IAuthenticationEvent) => {
            console.log(event);
            this._chandDetectorRef.markForCheck();
        });
        this._router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.menuState = false;
                this._chandDetectorRef.markForCheck();
            }
        })
    }

    isAuthenticated(): boolean {
        return this._authService.isAunthenticated();
    }

    public isLinkActive(url: string): boolean {
        console.log(this._router.routerState.snapshot.url)
        return (this._router.routerState.snapshot.url === url);
    }

    logout($event: Event) {
        $event.preventDefault();
        this.menuState = false;
        this._authService.logout();
        this._router.navigate(["/"]);
    }
}
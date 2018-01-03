import { Component, OnInit } from '@angular/core';
import { NavigableLink } from "./../../../interfaces";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _router: Router) { }

  public links: NavigableLink[] = [
    {
      name: "Dashboard",
      url: "/admin/dashboard"
    },
    {
      name: "Posts",
      url: "/admin/posts"
    },
    {
      name: "Pages",
      url: "/admin/pages"
    }
  ]

  public isLinkActive(url: string): boolean {
    console.log(this._router.routerState.snapshot.url)
    return (this._router.routerState.snapshot.url === url);
  }

  ngOnInit() {
  }

}

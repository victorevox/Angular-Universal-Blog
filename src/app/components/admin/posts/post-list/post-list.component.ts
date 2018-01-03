import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToCreate() {
    this._router.navigate(["admin/posts/create"]);
  }

}

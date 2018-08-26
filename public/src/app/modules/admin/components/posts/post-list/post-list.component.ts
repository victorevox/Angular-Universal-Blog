import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { IPost, IResourceListResponse } from '@shared/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts: Array<IPost> = [];
  public columnsToShow: Array<IColumnMaping> = [
    { path: "title", label: "Title" },
    { path: "content", label: "Content" },
    { path: "createdAt", label: "Published On" }
  ]

  constructor(private _router: Router, private _http: HttpClient) { 
    this._http.get('/api/post').subscribe((response: IResourceListResponse) => {
      try {
        let data = response
        this.posts = data.documents;
        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    })
  }

  ngOnInit() {
  }

  edit(post: IPost) {
    this._router.navigate([`admin/posts/${post._id}/edit`]);    
  }

  goToCreate() {
    this._router.navigate(["admin/posts/create"]);
  }

}

export interface IColumnMaping {
  path: string,
  label: string
}
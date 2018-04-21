import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpService } from "./../../../../services";
import { IPost, IResourceListResponse } from './../../../../interfaces';

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

  constructor(private _router: Router, private _http: CustomHttpService) { 
    this._http.get('/api/post').subscribe(response => {
      try {
        let data: IResourceListResponse = <IResourceListResponse>response.json()
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
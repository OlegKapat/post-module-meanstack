import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {environment} from "../../environments/environment"
import { Post } from "./post.model";
const LINK_URL= environment.apiURL + "/posts";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{post:Post[], postCount:number}>();
  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postPerPage:number,currentPage:number) {
    const queryParams=`?pagesize=${postPerPage}&page=${currentPage}`
    this.http
      .get<{ message: string; posts: any,maxPost:number }>(LINK_URL+queryParams)
      .pipe(
        map((postData) => {
          return {posts:postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator:post.creator
            };
          }),
          maxPosts:postData.maxPost
        };
        })
      )
      .subscribe((transformData) => {

        (this.posts = transformData.posts), this.postUpdated.next({post:[...this.posts],postCount:transformData.maxPosts});
      });
  }
  addPost(title: string, content: string, image: File) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        LINK_URL,
        formData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/"]);
      });
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator:string;
    }>(`http://localhost:3000/api/posts/${id}`);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let formData: Post | FormData;
    if (typeof image === "object") {
      formData = new FormData();
      formData.append("id",id),
      formData.append("title", title),
      formData.append("content", content),
      formData.append("image", image);
    } else {
      formData = { id: id, title: title, content: content, imagePath: image, creator:null };
    }
    this.http
      .put(`http://localhost:3000/api/posts/${id}`, formData)
      .subscribe((response) => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
   return  this.http
      .delete(`http://localhost:3000/api/posts/${postId}`);
  }
}

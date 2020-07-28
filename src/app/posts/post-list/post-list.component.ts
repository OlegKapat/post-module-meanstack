import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts=[
  //   {title:"First post",content:"Some content for the efirst post"},
  //   {title:"Second post",content:"Some content for the second post"},
  //   {title:"Third post",content:"Some content for the third post"}
  // ]
  posts: Post[] = [];
  aSub: Subscription;
  isLoading = false;
  userId:string;
  totalPost=0;
  postPerPage=5;
  currenPage=1;
  pageSizeOptions=[1,2,5,10];
  private statusSubs:Subscription;
  isUserAuthenticated=false;

  constructor(private postService: PostsService, private authService:AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage,this.currenPage);
    this.userId=this.authService.getUserId();
    this.aSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: {post:Post[], postCount:number}) => {
        this.totalPost=postData.postCount
        this.isLoading = false;
        this.posts = postData.post;
      });
      this.isUserAuthenticated=this.authService.getIsAuth();
      this.statusSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{this.isUserAuthenticated=isAuthenticated,this.userId=this.authService.getUserId()})
  }
  ngOnDestroy() {
    this.aSub.unsubscribe();
    this.statusSubs.unsubscribe();
  }
  onDelete(postId) {
    this.isLoading=true;
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPosts(this.postPerPage,this.currenPage)
    },()=>{
      this.isLoading=false
    })
  }
  onChangePage(pageData:PageEvent){
    this.isLoading=true;
    this.currenPage=pageData.pageIndex+1;
    this.postPerPage=pageData.pageSize;
    this.postService.getPosts(this.postPerPage,this.currenPage);
  }
}

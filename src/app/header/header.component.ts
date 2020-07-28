import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']

})
export class HeaderComponent implements OnInit,OnDestroy{
    private authListenerSubs:Subscription;
    userAuthenticated=false;

    constructor(private authService:AuthService){}
    
    ngOnInit(){
      this.userAuthenticated=this.authService.getIsAuth()
      this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{this.userAuthenticated=isAuthenticated

      })
    }
    ngOnDestroy(){
        this.authListenerSubs.unsubscribe()
    }
    LogOut(){
      this.authService.logout();
    }
}
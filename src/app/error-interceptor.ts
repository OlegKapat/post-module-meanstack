import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterseptor implements HttpInterceptor{
    constructor(public dialog: MatDialog){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error:HttpErrorResponse)=>{
            let errorMessage="Unknown message"
            if(error.error.message){
                errorMessage=error.error.message;
            }
            this.dialog.open(ErrorComponent,{data:{message:errorMessage}}); return throwError(error)}))
    }

}
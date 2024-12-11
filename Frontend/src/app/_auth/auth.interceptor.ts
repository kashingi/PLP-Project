import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserAuthService } from "../services/user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor( 
        private userAuthService: UserAuthService,
        private router: Router 
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone())
        }

        const token = this.userAuthService.getToken();


        if (token) {
            req = this.addtoken(req, token);
        }

        return next.handle(req).pipe(
            catchError((err: HttpResponse<any>) => {
                console.log(err.status);
                if (err.status === 401) {
                    this.router.navigate(['/login'])
                }else if (err.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
                return throwError("Something went wrong");
            })
        );
    }

    //If jwtToken is missing, add it to the header
    private addtoken(request: HttpRequest<any>, token: any) {
        return request.clone({
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        });
    }
}
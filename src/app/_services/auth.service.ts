import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:5001/api/User';

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    private userSubject = new BehaviorSubject<any>(null);
    user$: Observable<any> = this.userSubject.asObservable();
    constructor(private http: HttpClient,
                ) {

    }
    getUserList(){
        const URL = 'https://api.npoint.io/073b9b83c66cf9721c72';
        const url = this.url + '/GetAll';
        return this.http.get<any>(url).pipe(
            catchError(error => {
                return this.http.get<any>(URL);
            })
        );
    }
    getUser(){
        return this.user$;
    }
    postUser(e: any){
        const url = this.url + '/Add';
        let f = {
            "username": e.username,
            "name": e.name,
            "email": "",
            "pwd": e.pwd,
            "is_admin": false,
            "dietType": 0
        }
        return this.http.post<any>(url, f);
    }

    signIn(e: any) {
        if (true) {
            this.isLoggedInSubject.next(true);
            this.userSubject.next(e);
            this.getFav(e.id).subscribe(res => {
                this.favSubject.next(res);
            })
        } else {
            this.favSubject.next([]);
            this.isLoggedInSubject.next(false);
            this.userSubject.next(null);
        }
    }

    signOut(): void {
        this.isLoggedInSubject.next(false);
        this.userSubject.next(null);
    }

    private url_fav = 'http://localhost:5001/api/Favorite/GetWithFilter';
    private favSubject = new BehaviorSubject<any[]>([]);
    favList$ = this.favSubject.asObservable();
    getFav(id: any){
        const url = this.url_fav;
        return this.http.post<any>(url, id);
    }
}

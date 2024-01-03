import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:5001/api/User';
    private userListSubject = new BehaviorSubject<any>(null);
    userList$: Observable<any> = this.userListSubject.asObservable();

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    private userSubject = new BehaviorSubject<any>(null);
    user$: Observable<any> = this.userSubject.asObservable();
    constructor(private http: HttpClient,
                ) {

    }
    getUserList(){
        const URL = 'https://api.npoint.io/073b9b83c66cf9721c72';
        return this.http.get<any>(URL);
    }
    getUser(){
        return this.user$;
    }
    signIn(username:any) {
        if (true) {
            this.isLoggedInSubject.next(true);
            this.userSubject.next(username);
        } else {
            this.isLoggedInSubject.next(false);
            this.userSubject.next('');
        }
    }
    signUp(){

    }

    signOut(): void {
        this.isLoggedInSubject.next(false);
        this.userSubject.next('');
    }

}

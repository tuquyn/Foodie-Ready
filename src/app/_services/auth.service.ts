import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:5001/api/User';

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    private userSubject = new BehaviorSubject<any>(null);
    user$: Observable<any> = this.userSubject.asObservable();
    constructor() {}

    signIn(username:any) {
        if (true) {
            this.isLoggedInSubject.next(true);
            this.userSubject.next('lalala');
        } else {
            this.isLoggedInSubject.next(false);
            this.userSubject.next('');
        }
    }

    signOut(): void {
        this.isLoggedInSubject.next(false);
        this.userSubject.next('');
    }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    private usernameSubject = new BehaviorSubject<string>('');
    username$: Observable<string> = this.usernameSubject.asObservable();
    constructor() {}

    signIn(username:string) {
        if (true) {
            this.isLoggedInSubject.next(true);
            this.usernameSubject.next(username);
        } else {
            this.isLoggedInSubject.next(false);
            this.usernameSubject.next('');
        }
    }

    signOut(): void {
        this.isLoggedInSubject.next(false);
        this.usernameSubject.next('');
    }

}

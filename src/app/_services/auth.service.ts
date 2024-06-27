import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:5141/api/User';

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

    private url_fav = 'http://localhost:5141/api/Favorite/';
    private favSubject = new BehaviorSubject<any[]>([]);
    favList$ = this.favSubject.asObservable();
    getFav(id: any){
        const url = this.url_fav + 'GetWithFilter';
        return this.http.post<any>(url, id);
    }
    postFav(e: any){
        const url = this.url_fav + 'Add';
        let f = {
            "isDelete": false,
            "userId": e.userId,
            "recipeId": e.recipeId,
        };
        return this.http.post<any>(url, f);
    }
    putFav(e: any){
        const url = this.url_fav + 'Update/' + e.id;
        return this.http.put<any>(url, {
            "id": e.id,
            "isDelete": !e.isDelete,
            "userId": e.userId,
            "recipeId": e.recipeId
        });
    }

    private url_plan = 'http://localhost:5141/api/ScheduledMeal/';
    private planSubject = new BehaviorSubject<any>([]);
    planList$: Observable<any> = this.planSubject.asObservable();
    getPlan(id: any){
        const url = this.url_plan + 'GetWithFilter';
        return this.http.post<any>(url, id);
    }
    postListPlan(e:any[]){
        console.log(e);
        const url = this.url_plan + 'AddList';
        return this.http.post<any>(url, e);
    }
    postPlan(e: any){
        const url = this.url_plan + 'Add';
        return this.http.post<any>(url, e);
    }
}

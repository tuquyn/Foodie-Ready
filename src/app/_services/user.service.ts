import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:5001/api/Favorite';
    private url2 = 'http://localhost:5001/api/Plan';
    private url3 = 'http://localhost:5001/api/GroceryList';

    private favSubject = new BehaviorSubject<number[]>([]);
    favList$: Observable<number[]> = this.favSubject.asObservable();
    private planSubject = new BehaviorSubject<any>([]);
    planList$: Observable<any> = this.planSubject.asObservable();
    private cartSubject = new BehaviorSubject<any>([]);
    cartList$: Observable<any> = this.cartSubject.asObservable();

    constructor(private http: HttpClient,
                private authService: AuthService) {
        // this.getFav().subscribe(res => {
        //     this.favSubject.next(res);
        // });
        // this.getPlan().subscribe(res => {
        //     this.planSubject.next(res);
        // });
        // this.getCart().subscribe(res => {
        //     this.cartSubject.next(res);
        // });
    }
    getFav():Observable<any>{
        const URL = 'https://api.npoint.io/e34a63dff3728d7582f1';
        // match userId, isDelete = false, return integer list of recipeId
        return this.http.get<any>(URL);
    }
    getPlan():Observable<any>{
        const URL = 'https://api.npoint.io/69109bbb88915de5eee2';
        // match userId, return date, recipeId
        return this.http.get<any>(URL);
    }
    getCart():Observable<any>{
        const URL = 'https://api.npoint.io/69109bbb88915de5eee2';
        return this.http.get<any>(URL);
    }
    getFavList(){
        return this.favList$;
    }
    getPlanList(){
        return this.planList$;
    }
    getCartList(){
        return this.cartList$;
    }
}

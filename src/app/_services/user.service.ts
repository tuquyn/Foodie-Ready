import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:5001/api/User';

    constructor(private http: HttpClient) { }
    getExampleData(): Observable<any> {
        return this.http.get<any>(`${this.url}/GetAll`);
    }

    postExampleData(data: any): Observable<any> {
        return this.http.post<any>(`${this.url}/endpoint`, data);
    }
}

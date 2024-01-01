import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private url = 'http://localhost:5001/api/Recipe';

    constructor(private http: HttpClient) { }
    getRecipe(id: any): Observable<any> {
        // const URL = 'https://api.spoonacular.com/recipes/'+id+'/information?apiKey=cdab7760268248fd9f4991b569159a4b&includeNutrition=true';
        var URL = 'https://api.npoint.io/28e95797dba5b3202b8b';
        if(id == 1) URL = 'https://api.npoint.io/1ac81f639acb8327c779';
        if(id == 3) URL = 'https://api.npoint.io/a6ea88a36401d8a329db';
        return this.http.get<any>(URL);
    }

    // Example POST request
    postExampleData(data: any): Observable<any> {
        return this.http.post<any>(`${this.url}/endpoint`, data);
    }
}

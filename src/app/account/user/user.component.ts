import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy{
    isLoggedIn$ = this.authService.isLoggedIn$;

    user:any;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                ) {}

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    ngOnInit() {
        this.subscriptions.push(this.authService.user$.subscribe(e => {
            this.user = e;
        }));
    }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
    isLoggedIn$ = this.authService.isLoggedIn$;

    user:any;
    constructor(private authService: AuthService,
                ) {}
    ngOnInit() {
        this.authService.user$.subscribe(e => {
            this.user = e;
        });
    }
}

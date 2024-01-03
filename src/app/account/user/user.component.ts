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
    username:any;
    constructor(private authService: AuthService,
                ) {}
    ngOnInit() {
        this.authService.getUser().subscribe(e => {
            this.username = e;
        });
        this.authService.getUserList().subscribe(e => {
            let o = e.filter((f: any) => f.username == this.username)[0];
            if(o != null)
            this.user = {
                id: o.id,
                pwd: o.pwd,
                name: o.name,
                email: o.email,
                dietType: o.dietType,
                is_admin: o.is_admin,
                username: o.username,
            }
        });
    }
    show(){
        console.log(this.user)
    }
}

import {Component} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
    isLoggedIn$ = this.authService.isLoggedIn$;
    username$= this.authService.user$;

    constructor(private authService: AuthService,
                private router: Router) {}
    redirectToUserPage() {
        this.username$.subscribe((name: string) =>{
            this.router.navigate(['/user', name]);
        })
    }
    logout(){
        this.authService.signOut();
    }
}

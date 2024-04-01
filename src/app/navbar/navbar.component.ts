import {Component} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginSheetComponent} from "../account/login-sheet/login-sheet.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
    isLoggedIn$ = this.authService.isLoggedIn$;
    user$= this.authService.user$;

    constructor(private authService: AuthService,
                private router: Router,
                private _bottomSheet: MatBottomSheet,) {}
    redirectToUserPage() {
        this.user$.subscribe(e => {
            this.router.navigate(['/user', e.name]);
        })
    }
    logout(){
        this.authService.signOut();
        setTimeout(() => {
            this.router.navigate(['/home']);
        }, 2000);
    }
}

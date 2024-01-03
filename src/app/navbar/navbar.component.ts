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
    username$= this.authService.user$;

    constructor(private authService: AuthService,
                private router: Router,
                private _bottomSheet: MatBottomSheet,) {}
    redirectToUserPage() {
        this.authService.getUser().subscribe((name: string) =>{
            this.router.navigate(['/user', name]);
        });
    }
    logout(){
        this.authService.signOut();
    }
    openBottomSheet(){
        this.isLoggedIn$.subscribe(e => {
            if(!e){
                this._bottomSheet.open(LoginSheetComponent);
            }
        });
    }
}

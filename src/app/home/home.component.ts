import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginSheetComponent} from "../account/login-sheet/login-sheet.component";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    isLoggedIn$ = this.authService.isLoggedIn$;

    constructor(public dialog: MatDialog,
                private _bottomSheet: MatBottomSheet,
                private authService: AuthService,
                private router: Router,
                private userService: UserService
                ) {
    }
    ngOnInit(){
        this.getData();
    }
    getData() {
        // this.userService.getExampleData().subscribe(
        //     (data) => {
        //         console.log('Received data:', data);
        //         // Process the data as needed
        //     },
        //     (error) => {
        //         console.error('Error fetching data:', error);
        //     }
        // );
    }
    openBottomSheet() {
        this._bottomSheet.open(LoginSheetComponent);
    }
    login(){
        this.authService.signIn('lalala');
    }
    logout(){
        this.authService.signOut();
    }
    redirectToUserPage(name: string) {
        this.router.navigate(['/user', name]);
    }
}

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RecipeDialogComponent} from "../recipe-dialog/recipe-dialog.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LoginSheetComponent} from "../account/login-sheet/login-sheet.component";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

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
                private router: Router) {}
    ngOnInit(){

    }
    openBottomSheet() {
        this._bottomSheet.open(LoginSheetComponent);
    }
    openDialog(){
        let dialogRef = this.dialog.open(RecipeDialogComponent, {
            width: '800px',
            height: '600px',
            data: { }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
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

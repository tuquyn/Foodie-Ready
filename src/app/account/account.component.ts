import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
    hidePsw = true;
    durationInSeconds = 3;
    isLoggedIn$ = this.authService.isLoggedIn$;
    user: any;

    constructor(private _formBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private authService: AuthService) {}

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required],
    });

    signOut(){
        this.authService.signOut();
    }
    signUp(){
        // this.successAction();
        // this.authService.signIn(username);
    }

    signIn(){
        this.successAction();
        this.authService.signIn('lalala');
    }
    successAction(){
        this._snackBar.open("Success", "Close", {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
    failAction(){
        this._snackBar.open("Error", "Close", {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
    refreshPage(): void {
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

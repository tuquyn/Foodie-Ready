import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
    hidePsw = true;
    durationInSeconds = 3;
    isLoggedIn$ = this.authService.isLoggedIn$;
    user: any = {username: '', pwd: ''};
    userList:any[] = [];
    isUserValid = false;

    constructor(private _formBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private authService: AuthService,
                private router: Router,
    ) {
        this.authService.getUserList().subscribe(e => {
           this.userList = e;
        });
    }

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
        try {
            this.authService.signUp();
            this.successAction();
        }catch {
            this.failAction();
        }
    }

    signIn(){
        if(this.checkAccount()){
            this.authService.signIn(this.user.username);
            this.successAction();
            // setTimeout(() => {
            //     this.router.navigate(['/user', name]);
            // }, 5000);
        }else{
            this.failAction();
        }
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
    refreshPage(){
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    checkAccount(){

        let index = this.userList.findIndex(e => e.username == this.user.username);
        if(index == -1 || this.userList[index].pwd != this.user.pwd){
            return false;
        }else{
            return true;
        }
    }
    hasUsername(){
        let username = this.secondFormGroup.controls['secondCtrl'].value;
        this.isUserValid = this.userList.map(e => e.username).includes(username);
    }
}

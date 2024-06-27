import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {EncryptionService} from "../encryption.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy{
    hidePsw = true;
    durationInSeconds = 2;

    user: any = {username: '', pwd: ''};
    userList:any[] = [];
    isUserValid = false;
    private subscriptions: Subscription[] = [];

    constructor(private _formBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private authService: AuthService,
                private router: Router,
                private encryptionService: EncryptionService
    ) {
    }

    ngOnInit() {
        this.getData();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
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

    getData(){
        const sub = this.authService.getUserList().subscribe(e => {
            this.userList = e;
        });
        this.subscriptions.push(sub);

        this.isUserValid = false;
    }
    signUp(){
        try {
            let e = {
                name: this.firstFormGroup.controls['firstCtrl'].value,
                username: this.secondFormGroup.controls['secondCtrl'].value,
                pwd: this.encryptionService.encrypt(<string>this.thirdFormGroup.controls['thirdCtrl'].value),
            };

            const sub = this.authService.postUser(e).subscribe( response => {
                    this.successAction();
                    this.getData();
                // setTimeout(() => {
                //     this.router.navigate(['/account']);
                // }, 1000);
                }
            );
            this.subscriptions.push(sub);

        }catch {
            this.failAction();
        }
    }

    signIn(){
        if(this.checkAccount()){
            let index = this.userList.findIndex(e => e.username == this.user.username);
            this.authService.signIn(this.userList[index]);
            this.successAction();
            // setTimeout(() => {
            //     this.router.navigate(['/home']);
            // }, 1000);
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
    checkAccount(){
        let index = this.userList.findIndex(e => e.username == this.user.username);
        if(index == -1 || this.encryptionService.decrypt(this.userList[index].pwd) != this.user.pwd){
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

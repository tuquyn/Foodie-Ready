import {Component, OnInit} from '@angular/core';
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

    constructor(
                private _bottomSheet: MatBottomSheet,
                private authService: AuthService,
                ) {
    }
    ngOnInit(){
    }

}

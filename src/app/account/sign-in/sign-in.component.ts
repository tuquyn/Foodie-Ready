import { Component } from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
    constructor(private authService: AuthService) {}

    signIn(username: string): void {
        this.authService.signIn(username);
    }
}

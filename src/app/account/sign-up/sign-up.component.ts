import { Component } from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    constructor(private authService: AuthService) {}

    signUp(username: string): void {
        this.authService.signIn(username);
    }
}

import { Component } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-login-sheet',
  templateUrl: './login-sheet.component.html',
  styleUrls: ['./login-sheet.component.css']
})
export class LoginSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<LoginSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

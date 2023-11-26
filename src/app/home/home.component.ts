import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RecipeDialogComponent} from "../recipe-dialog/recipe-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(public dialog: MatDialog) {}

    openDialog(): void {
        let dialogRef = this.dialog.open(RecipeDialogComponent, {
            width: '800px',
            height: '600px',
            data: { }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}

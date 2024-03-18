import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Recipe} from "../_models/recipe";
import {RecipeService} from "../_services/recipe.service";

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit {
    @Input() recipe: Recipe | undefined;
    chartOptions = {
        animationEnabled: true,
        title: {
            text: "Perception of Nutrition"
        },
        data: [{
            type: "doughnut",
            startAngle: -90,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###.##'%'",
            dataPoints: [
                { y: 22.53, name: "Carbs" },
                { y: 30.22, name: "Fat" },
                { y: 47.25, name: "Protein" },
            ]
        }]
    }
    displayedColumns = ['Name', 'Amount', 'Unit'];
    showTable: boolean = false;

    constructor(private recipeService: RecipeService,
        public dialogRef: MatDialogRef<RecipeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCancel() {
        this.dialogRef.close();
    }
    ngOnInit() {
        this.recipe = this.data;
        console.log(this.recipe)
        if(this.recipe?.caloricBreakdown){
            this.chartOptions.data[0].dataPoints[0].y = this.recipe?.caloricBreakdown.percentCarbs;
            this.chartOptions.data[0].dataPoints[1].y = this.recipe?.caloricBreakdown.percentFat;
            this.chartOptions.data[0].dataPoints[2].y = this.recipe?.caloricBreakdown.percentProtein;
        }
    }
    toggleTable(): void {
        this.showTable = !this.showTable;
    }
}

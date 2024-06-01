import { NgModule } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from '@angular/material/select';
import { ColorPickerModule } from 'ngx-color-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanComponent } from './plan/plan.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { FooterComponent } from './footer/footer.component';
import { PosterComponent } from './poster/poster.component';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { LoginSheetComponent } from './account/login-sheet/login-sheet.component';
import { UserComponent } from './account/user/user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'account', component: AccountComponent },
  { path: 'grocery-list', component: GroceryListComponent },
  { path: 'user/:name', component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeComponent,
    AccountComponent,
    NavbarComponent,
    PlanComponent,
    RecipeDetailComponent,
    FooterComponent,
    PosterComponent,
    RecipeDialogComponent,
    GroceryListComponent,
    LoginSheetComponent,
    UserComponent,
    CalendarComponent,
    TestComponent,
  ],
    imports: [
        HttpClientModule,
        CanvasJSAngularChartsModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        MatGridListModule,
        MatStepperModule,
        MatListModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatNativeDateModule,
        MatInputModule,
        MatRippleModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatBottomSheetModule,
        MatTooltipModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatChipsModule,
        ColorPickerModule,
        DragDropModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

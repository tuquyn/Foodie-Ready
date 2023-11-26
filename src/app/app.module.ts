import { NgModule } from '@angular/core';
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
import {MatButtonToggleModule} from "@angular/material/button-toggle";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'account', component: AccountComponent },
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
  ],
    imports: [
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
        BrowserAnimationsModule,
        MatButtonToggleModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { TaskCardComponent } from './task-card/task-card.component';
import {TaskListComponent} from "./task-list/task-list.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { TaskCardDialogComponent } from './task-card-dialog/task-card-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import { TaskFilterComponent } from './task-filter/task-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    TaskListComponent,
    TaskCardDialogComponent,
    TaskFilterComponent,

  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

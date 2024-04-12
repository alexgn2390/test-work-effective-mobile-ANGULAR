import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskCardDialogComponent} from "./task-card-dialog/task-card-dialog.component";

const routes: Routes = [

  { path: 'task-list', component: TaskListComponent },
  { path: 'task-card-dialog', component: TaskCardDialogComponent },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

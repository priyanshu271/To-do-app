import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ToDoCompComponent } from './components/to-do-comp/to-do-comp.component';

const routes: Routes = [{
  // path:'to-do',component:ToDoCompComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

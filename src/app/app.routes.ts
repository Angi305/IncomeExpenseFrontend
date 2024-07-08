import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component'; 
import { HomeComponentComponent } from './components/home-component/home-component/home-component.component';
import { IncomeEntryComponent } from './components/income-entry/income-entry.component';
import { DataComponentComponent } from './data-component/data-component.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent }, 
  { path: 'expense', redirectTo: 'expense-entry', pathMatch: 'full' }, 
  { path: 'expense-entry', component: ExpenseEntryComponent },
  { path: 'income', component: IncomeEntryComponent },
  { path: 'addedData', component: DataComponentComponent }, 

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

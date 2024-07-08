import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthServiceService } from './services/auth-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponentComponent } from './components/home-component/home-component/home-component.component';
import { IncomeEntryComponent } from './components/income-entry/income-entry.component';
import { DataComponentComponent } from './data-component/data-component.component';
import {ExpenseService} from './services/expenseService'
import { IncomeService } from './services/incomeService';
@NgModule({
  declarations: [
    AppComponent,
    ExpenseEntryComponent,
    HomeComponentComponent,
    IncomeEntryComponent,
    DataComponentComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,

    
  ],
  providers: [
    AuthServiceService,
    ExpenseService,
    IncomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

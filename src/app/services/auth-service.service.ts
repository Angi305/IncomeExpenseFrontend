import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IncomeCategory, IncomeEntryModel } from '../modal/income-modal';
import { ExpenseModal, ExpenseRecord } from '../modal/expense-modal';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:5003/api/'; 

  autocompleteForMonths(searchTerm: string): Observable<string[]> {
    console.log('Sending request with search term:', searchTerm);
    return this.http.get<string[]>(this.apiUrl+`month/AutocompleteForMonths?search=${searchTerm}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ExpenseModal, ExpenseRecord } from '../modal/expense-modal';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:5003/api/expense/'; 


  getExpenseCategories(): Observable<ExpenseModal[]> {
    console.log('Sending request to fetch categories.');
    return this.http.get<ExpenseModal[]>(this.apiUrl+'getCategories');
  }


  getExpenseRecords(): Observable<ExpenseRecord[]> {
    return this.http.get<ExpenseRecord[]>(`${this.apiUrl}`);
  }

  
  getAllExpenseEntries(): Observable<ExpenseRecord[]> {
    return this.http.get<ExpenseRecord[]>(this.apiUrl)
      
  }


  getExpenseEntry(id: string): Observable<ExpenseRecord> {
    return this.http.get<ExpenseRecord>(`${this.apiUrl}${id}`)

  }

  saveExpense(expenseData: ExpenseRecord): Observable<any> {
    console.log('Saving expense data:', expenseData);
    return this.http.post<any>(this.apiUrl + 'save', expenseData)
     
  }

  editExpense(model: ExpenseRecord): Observable<any> {
    console.log('Saving expense dataaaa:', model);
    return this.http.put<any>(this.apiUrl + model.id, model)
     
  }

  deleteExpense(id: string): Observable<any> {
    console.log('Saving expense data:',id );
    return this.http.delete<any>(this.apiUrl + id)
     
  }

}

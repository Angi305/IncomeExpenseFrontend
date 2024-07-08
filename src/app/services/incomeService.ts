import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IncomeCategory, IncomeEntryModel } from '../modal/income-modal';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:5003/api/income/'; 

  getIncomeCategories(): Observable<IncomeCategory[]> {
    console.log('Sending request to fetch income categories.');
    return this.http.get<IncomeCategory[]>(this.apiUrl+'getCategories');
  }

   getAllEntries(): Observable<IncomeEntryModel[]> {
    return this.http.get<IncomeEntryModel[]>(this.apiUrl);
  }
 
  getEntry(id: string): Observable<IncomeEntryModel> {
    return this.http.get<IncomeEntryModel>(`${this.apiUrl}${id}`)
  
  }
  
  saveIncome(model: IncomeEntryModel): Observable<any> {
    console.log('Saving expense data:', model);
    return this.http.post<any>(this.apiUrl + 'save', model)   
  }

  editIncome(model: IncomeEntryModel): Observable<any> {
    console.log('Saving expensetestest data:', model);
    return this.http.put<any>(this.apiUrl + model.id, model)  
  }

  deleteIncome(id: string): Observable<any> {
    console.log('Saving expense data:',id );
    return this.http.delete<any>(this.apiUrl + id)
     
  }


}

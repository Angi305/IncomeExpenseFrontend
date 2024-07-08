import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ExpenseService } from '../services/expenseService';
import { IncomeService } from '../services/incomeService';
import { IncomeEntryModel } from '../modal/income-modal';
import { ExpenseRecord } from '../modal/expense-modal';

@Component({
  selector: 'app-data-component',
  templateUrl: './data-component.component.html',
  styleUrls: ['./data-component.component.css']
})
export class DataComponentComponent implements OnInit {
  
  @Output() searchMonths = new EventEmitter<string>(); 
  expenseRecords: ExpenseRecord[] = []; 
  incomeRecords: IncomeEntryModel[] = [];
  matchingMonths: string[] = [];
  years: number[] = [];

  constructor(
    private authService: AuthServiceService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,

  ) {}
  
  ngOnInit(): void {
    this.fetchAllEntries();
    this.initializeYears();
    this.fetchExpenseRecords();

  }

  fetchAllEntries(): void {
    this.incomeService.getAllEntries().subscribe(
      (data: IncomeEntryModel[]) => {
        data.forEach(x=> x.isEditing = false);
        this.incomeRecords = data;
      },
      (error) => {
        console.error('Error fetching income records:', error);
      }
    );
  }

  fetchExpenseRecords(): void {
    this.expenseService.getAllExpenseEntries().subscribe(
      (records: ExpenseRecord[]) => {
        records.forEach(x=> x.isEditing = false);
        this.expenseRecords = records;
      },
      (error) => {
        console.error('Error fetching expense records:', error);
      }
    );
  }

  deleteRecord(id: string, type: 'income' | 'expense'): void {
    if (type === 'income') {
      this.incomeService.deleteIncome(id)
        .subscribe(() => {
          this.incomeRecords = this.incomeRecords.filter(record => record.id !== id);
          console.log('Income record deleted successfully');
        }, error => {
          console.error('Failed to delete income record:', error);
        });
    } else {
      this.expenseService.deleteExpense(id)
        .subscribe(() => {
          this.expenseRecords = this.expenseRecords.filter(record => record.id !== id);
          console.log('Expense record deleted successfully');
        }, error => {
          console.error('Failed to delete expense record:', error);
        });
    }
  }

  editRecord(record: any): void {
    record.isEditing = true;
  }

  cancelEdit(record: any): void {
    record.isEditing = false;
    this.fetchAllEntries();
    this.fetchExpenseRecords();
  }


  onIncomeSave(record: IncomeEntryModel): void {
    if (record && record.id) { 
      this.incomeService.editIncome(record).subscribe(
        (response: IncomeEntryModel) => {
          console.log('Income data saved successfully:', response);
          window.location.reload();
         
        },
        (error) => {
          console.error('Error saving income data:', error);
        }
      );
    } else {
      console.error('Invalid record or record ID is null or undefined');
    }

  }
  
  onExpenseSave(record: ExpenseRecord): void {
    this.expenseService.editExpense(record).subscribe(
      response => {
        console.log('Expense data saved successfully:', response);
        window.location.reload();
      },
      error => {
        console.error('Error saving income data:', error);
      }
      
    );
  }
  
  setupAutocomplete(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.trim().length > 0) {
      this.authService.autocompleteForMonths(searchTerm).subscribe(
        (months: string[]) => {
          this.matchingMonths = months;
        },
        (error) => {
          console.error('Error fetching months:', error);
        }
      );
    } else {
      this.matchingMonths = [];
    }
  }
  
  selectMonth(month: string, id: string): void {
    console.log('Selected month:', month);
    this.authService.autocompleteForMonths(month);

    const recordToUpdate = this.incomeRecords.find(x => x.id === id);

    if (recordToUpdate) {
      recordToUpdate.month = month;
    }
  }

  selectMonthForExpense(month: string, id: string): void {
    console.log('Selected month:', month);
    this.authService.autocompleteForMonths(month);

    const recordToUpdate = this.expenseRecords.find(x => x.id === id);

    if (recordToUpdate) {
      recordToUpdate.month = month;
    }
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= 2035; year++) {
      this.years.push(year);
    }
  }

}
  

 
 

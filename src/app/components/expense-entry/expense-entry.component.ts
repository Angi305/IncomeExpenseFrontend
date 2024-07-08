import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseModal, ExpenseRecord } from '../../modal/expense-modal';
import { ExpenseService } from '../../services/expenseService';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent implements OnInit {
  searchControl = new FormControl();
  matchingMonths: string[] = [];
  expenseRecords: any[] = [];
  years: number[] = [2022, 2023, 2024, 2025, 2026];
  expenseForm!: FormGroup;
  categories: ExpenseModal[] = [];
  selectedCategory: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private expenseService: ExpenseService,
    private router: Router
  ) {
    this.setupAutocomplete = this.setupAutocomplete.bind(this);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeYears();
    this.loadCategories();
  }

  initializeForm(): void {
    this.expenseForm = this.fb.group({
      month: [''],
      year: [new Date().getFullYear()],
      category: [''],
      food: [0],
      transport: [0],
      bills: [0],
      other: [0],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(,[0-9]{1,2})?$')]],
      valueType: [''],
    });

    this.expenseForm.get('category')?.valueChanges.subscribe(value => {
      console.log('Selected category id:', value);
      const selectedCategoryObj = this.categories.find(cat => cat.id === value);
      this.selectedCategory = selectedCategoryObj ? selectedCategoryObj.name : '';
    });
  }

  loadCategories(): void {
    this.expenseService.getExpenseCategories().subscribe(
      (categories: ExpenseModal[]) => {
        this.categories = categories;
        console.log('Loaded categories:', this.categories);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
        
      }
    );
  }
  

  setupAutocomplete(event?: Event) {
    if (event) {
      const searchTerm = (event.target as HTMLInputElement).value;
      if (searchTerm.trim().length > 0) {
        this.authService.autocompleteForMonths(searchTerm).subscribe(
          (months: string[]) => {
            this.matchingMonths = months;
          },
          (error: any) => {
            console.error('Error fetching months:', error);
          }
        );
      } else {
        this.matchingMonths = [];
      }
    }
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= 2035; year++) {
      this.years.push(year);
    }
  }

  onAmountChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    value = this.sanitizeDecimalInput(value);
    this.expenseForm.get('amount')?.setValue(value, { emitEvent: false });
  }

  onYearChange(event: Event) {
    console.log('Year changed:', this.expenseForm.get('year')?.value);
  }
  
  sanitizeDecimalInput(value: string): string {
    return value.replace(',', '.');
  }

  saveExpense(): void {
    if (this.expenseForm.valid) {
      const formData = this.expenseForm.value;
  
      const sanitizedAmount = this.sanitizeDecimalInput(formData.amount.toString());
  
      const newRecord:  ExpenseRecord = {
        id: "",
        month: formData.month,
        year: formData.year,
        category: formData.category,
        amount: parseFloat(sanitizedAmount), 
        valueType: formData.valueType
      };

  
      this.expenseService.saveExpense(newRecord).subscribe(
        (response) => {
          console.log('Income saved successfully:', response);
          this.fetchAllExpense(); 
          this.expenseForm.reset(); 
        },
        (error) => {
          console.error('Error saving income:', error);
          if (error.status === 400) {
            console.error('Bad Request. Check server logs for more details.');
          }
        }
      );
    } else {
      console.error('Form invalid. Cannot save record.');
    }
  }

  fetchAllExpense(): void {

    this.expenseService.getAllExpenseEntries().subscribe(
      (data: ExpenseRecord[]) => {
        this.expenseRecords = data;
      },
      (error) => {
        console.error('Error fetching income records:', error);
      }
    );
  }

  addNewRecord() {
    const newRecord = {
      month: '',
      year: new Date().getFullYear(),
      category: '',
      food: 0,
      transport: 0,
      bills: 0,
      other: 0,
      amount: 0.00, 
      valueType: ''
    };
    this.expenseRecords.push(newRecord);
  }


  selectMonth(month: string): void {
    console.log('Selected month:', month);
    this.expenseForm.get('month')?.setValue(month);
    this.matchingMonths = [];
  }

}

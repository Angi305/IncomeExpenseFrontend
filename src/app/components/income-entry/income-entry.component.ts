import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { IncomeCategory, IncomeEntryModel } from '../../modal/income-modal';
import { IncomeService } from '../../services/incomeService';

@Component({
  selector: 'app-income-entry',
  templateUrl: './income-entry.component.html',
  styleUrls: ['./income-entry.component.css']
})
export class IncomeEntryComponent implements OnInit {
  
  incomeForm!: FormGroup;
  matchingMonths: string[] = [];
  incomeRecords: IncomeEntryModel[] = [];
  years: number[] = [];
  categories: IncomeCategory[] = [];
  autocomplete: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private incomeService: IncomeService,

  ) {
    
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeYears();
    this.loadIncomeCategories();
    this.fetchAllEntries();
  }

  initializeForm(): void {
    this.incomeForm = this.fb.group({
      month: [''],
      year: [new Date().getFullYear()],
      category: [''],
      salary: [0],
      travelExpenses: [0],
      other: [''],
      amount: '0,00',
      valueType: ['']
    });
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

  selectMonth(month: string): void {
    this.incomeForm.get('month')?.setValue(month);
    this.matchingMonths = [];
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= 2035; year++) {
      this.years.push(year);
    }
  }

  loadIncomeCategories(): void {
    this.incomeService.getIncomeCategories().subscribe(
      (categories: IncomeCategory[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  saveIncome(): void {
    if (this.incomeForm.valid) {
      const formData = this.incomeForm.value;
  
      const sanitizedAmount = this.sanitizeDecimalInput(formData.amount.toString());
  
      const newRecord: IncomeEntryModel = {
        id: "",
        month: formData.month,
        year: formData.year,
        category: formData.category,
        amount: parseFloat(sanitizedAmount),
        valueType: formData.valueType
      };
  
      this.incomeService.saveIncome(newRecord).subscribe(
        (response) => {
          console.log('Income saved successfully:', response);
          this.fetchAllEntries(); 
          this.incomeForm.reset(); 
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

  fetchAllEntries(): void {

    this.incomeService.getAllEntries().subscribe(
      (data: IncomeEntryModel[]) => {
        this.incomeRecords = data;
      },
      (error) => {
        console.error('Error fetching income records:', error);
      }
    );
  }
  sanitizeDecimalInput(value: string): string {
    return value.replace(',', '.');
  }

  onValueTypeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', selectedValue);
    if (selectedValue === 'planned') {
    } else if (selectedValue === 'actual') {
    }
  }

 
}

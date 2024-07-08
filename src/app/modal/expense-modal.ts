export interface ExpenseRecord {

    id: string;
    month: string;
    year: number;
    category: string;
    amount: number;
    valueType: string;
    isEditing?: boolean;
    matchingMonths?: string[]; 
  showMonthAutocomplete?: boolean;  

  }
  
  export interface ExpenseModal {
    id: number;
    name: string;
  }
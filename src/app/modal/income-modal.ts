
export interface IncomeEntryModel {

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
  
  export interface IncomeCategory {
    id: number;
    name: string;
  }
  
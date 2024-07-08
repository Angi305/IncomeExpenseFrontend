import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  constructor(private router: Router) { }

  redirectToExpenseEntry() {
    this.router.navigate(['/expense-entry']);
    console.log('redirectToExpenseEntry')
  }

  redirectToInEntry() {
    this.router.navigate(['/income']);
    console.log('redirectToInEntry')
  }
  redirectToData() {
    this.router.navigate(['/addedData']);
    console.log('redirectToData')
  }
 
}

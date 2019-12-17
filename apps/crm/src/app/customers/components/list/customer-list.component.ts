import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '@web-starter-kit/api-interfaces';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  filterForm: FormGroup;

  customerList$: Observable<Array<Customer>>;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [null],
      identityNumber: [null]
    });
    this.filterCustomers();
  }

  filterCustomers(): void {
    const query = this.filterForm.value;
    this.customerList$ = this.customerService.searchCustomers(query);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filterCustomers();
  }

  goToCustomerForm(customerId?: number): void {
    const routePaths = ['customers'];
    if (customerId) {
      routePaths.push(customerId.toString());
    }
    this.router.navigate(routePaths);
  }
}

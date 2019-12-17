import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer, CustomerStatus, CustomerType, IdentityType } from '@web-starter-kit/api-interfaces';
import { CustomerService } from '../../services/customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'crm-example-add-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit, OnChanges {

  @Input() customer: Customer;
  @Input() countries: Array<any>;

  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<Customer> = new EventEmitter<Customer>();

  customerForm: FormGroup;

  customerTypes: Array<{ label: string, value: string }>;
  identityTypes: Array<{ label: string, value: string }>;
  customerStatuses: Array<{ label: string, value: string }>;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {

    this.customerTypes = Object.keys(CustomerType)
      .map(key => ({label: CustomerType[key], value: key}));
    this.identityTypes = Object.keys(IdentityType)
      .map(key => ({label: IdentityType[key], value: key}));
    this.customerStatuses = Object.keys(CustomerStatus)
      .map(key => ({label: CustomerStatus[key], value: key}));

    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          const customerId = +params['id'];
          this.customerService.getCustomerById(customerId)
            .subscribe(customer => this.populateCustomer(customer));
        });

    this.createForm();
  }

  ngOnChanges(): void {

    let formCustomer = {} as Customer;

    if (this.customer && this.countries) {
      formCustomer = {
        ...this.customer,
        customerType: this.customer.customerType && Object.keys(CustomerType).find(key => this.customer.customerType === CustomerType[key]),
        identityType: this.customer.identityType && Object.keys(IdentityType).find(key => this.customer.identityType === IdentityType[key]),
        status: this.customer.status && Object.keys(CustomerStatus).find(key => this.customer.status === CustomerStatus[key]),
        registrationDate: this.customer.registrationDate && new Date(this.customer.registrationDate),
        country: this.customer.country && this.countries.find(c => c.name === this.customer.country)
      } as Customer;
    }

    if (this.customerForm) {
      this.customerForm.patchValue(formCustomer);
    }
  }

  saveCustomer(): void {

    if (this.customerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid form',
        detail: 'Please fill in required fields before submitting form.'
      });
      return;
    }

    this.save.emit(this.customerForm.value);
    this.customerForm.reset();
  }

  goBackToList(): void {
    this.location.back();
  }

  private createForm(): void {
    this.customerForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      customerType: [null, Validators.required],
      identityNumber: [null],
      identityType: [null],
      country: [null],
      citizen: [null],
      registrationDate: [null],
      status: [null, Validators.required]
    });
  }

  private populateCustomer(customer: Customer) {
    let formCustomer = {} as Customer;

    if (customer) {
      formCustomer = {
        ...customer,
        customerType: customer.customerType && Object.keys(CustomerType).find(key => customer.customerType === CustomerType[key]),
        identityType: customer.identityType && Object.keys(IdentityType).find(key => customer.identityType === IdentityType[key]),
        status: customer.status && Object.keys(CustomerStatus).find(key => customer.status === CustomerStatus[key]),
        registrationDate: customer.registrationDate && new Date(customer.registrationDate)
      } as Customer;
    }

    if (this.customerForm) {
      this.customerForm.patchValue(formCustomer);
    }
  }
}

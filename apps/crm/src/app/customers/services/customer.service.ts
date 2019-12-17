import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@web-starter-kit/api-interfaces';
import { environment } from 'apps/crm/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  // private readonly baseUrl = 'http://localhost:3333/api/customers';
  private readonly baseUrl = `${environment.apiUrl}/customers`;

  getAllCountries(): Observable<any[]> {
    return this.httpClient.get<any>('https://restcountries.eu/rest/v2/all');
  }

  searchCustomers(query: any = {}): Observable<Array<Customer>> {

    const params = [];
    Object.keys(query)
      .filter(key => query[key])
      .forEach(key => params.push(`${key}=${query[key]}`));

    const url = `${this.baseUrl}/search?${params.join('&')}`;

    return this.httpClient.get<Array<Customer>>(url);
  }

  saveCustomer(newCustomer: Customer): Observable<Customer> {

    let method = 'POST'.toLowerCase();

    if (newCustomer.id) {
      method = 'PUT'.toLowerCase();
    }

    return this.httpClient[method]<Customer>(this.baseUrl, newCustomer);
  }

  getCustomerById(customerId: number): Observable<Customer> {

    const url = `${this.baseUrl}/${customerId}`;

    return this.httpClient.get<Customer>(url);
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, Message } from '@web-starter-kit/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}

  customers$: Observable<Array<Customer>> = this.http.get<Array<Customer>>('/api/customers');
}

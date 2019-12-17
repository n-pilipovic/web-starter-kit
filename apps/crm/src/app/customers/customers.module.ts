import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UiSharedModule } from '../ui-shared/ui-shared.module';
import { AddEditCustomerComponent } from './components/add-edit/add-edit-customer.component';
import { CustomerListComponent } from './components/list/customer-list.component';
import { CustomerService } from './services/customer.service';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'add',
    component: AddEditCustomerComponent
  },
  {
    path: 'list',
    component: CustomerListComponent
  },
  {
    path: ':id',
    component: AddEditCustomerComponent
  }
]

@NgModule({
  declarations: [
    CustomerListComponent,
    AddEditCustomerComponent
  ],
  imports: [
    UiSharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CustomerService
  ]
})
export class CustomersModule {}
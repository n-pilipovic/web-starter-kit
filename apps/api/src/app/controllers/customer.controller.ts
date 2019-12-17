import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Customer } from '@web-starter-kit/api-interfaces';
import { CustomerService } from '../services/customer.service';


@Controller('customers')
export class CustomerController {
  constructor(private readonly crmApiService: CustomerService) {}

  @Get()
  getData(): Array<Customer> {
    return this.crmApiService.getAllCustomers();
  }

  @Get('search')
  searchForCustomers(@Query() query: any): Array<Customer> {
    return this.crmApiService.searchCustomer(query);
  }

  @Get(':customerId')
  getCustomerById(@Param('customerId') customerId: string): Customer {
    return this.crmApiService.getCustomerById(+customerId);
  }

  @Post()
  addCustomer(@Body() customer: Customer): Customer {
    return this.crmApiService.addCustomer(customer);
  }

  @Put()
  updateCustomer(@Body() customer: Customer): Customer {
    return this.crmApiService.updateCustomer(customer);
  }
}
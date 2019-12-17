import { Test } from '@nestjs/testing';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CustomerService]
    }).compile();

    service = app.get<CustomerService>(CustomerService);
  });

  describe('getAllCustomers().length', () => {
    it('should return 2', () => {
      expect(service.getAllCustomers().length).toEqual(2);
    });
  });
});

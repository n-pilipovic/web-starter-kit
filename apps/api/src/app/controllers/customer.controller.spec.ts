import { Test, TestingModule } from '@nestjs/testing';

import { CustomerContoller } from './customer.controller';
import { CustomerService } from '../services/customer.service';

describe('CustomerContoller', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CustomerContoller],
      providers: [CustomerService]
    }).compile();
  });

  describe('getData', () => {
    it('should return 2 objects', () => {
      const controller = app.get<CustomerContoller>(CustomerContoller);
      expect(controller.getData().length).toEqual(2);
    });
  });
});
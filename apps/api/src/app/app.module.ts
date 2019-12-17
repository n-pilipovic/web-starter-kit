import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerController } from './controllers/customer.controller';
import { UserController } from './controllers/user.controller';

import { AppService } from './app.service';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CustomerController,
    UserController
  ],
  providers: [
    AppService,
    CustomerService,
    UserService
  ]
})
export class AppModule {}

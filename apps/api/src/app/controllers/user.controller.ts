import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '@web-starter-kit/api-interfaces';
import { UserService } from '../services/user.service';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getData(): Array<User> {
    return this.userService.getAllUsers();
  }

  @Get('search')
  searchForUsers(@Query() query: any): Array<User> {
    return this.userService.searchUser(query);
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): User {
    return this.userService.getUserById(+userId);
  }

  @Post()
  addCustomer(@Body() user: User): User {
    return this.userService.addUser(user);
  }

  @Put()
  updateUser(@Body() user: User): User {
    return this.userService.updateUser(user);
  }
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@web-starter-kit/api-interfaces';

@Injectable()
export class UserService {

  userList: Array<User> = [
    {
      id: 1,
      username: 'admin',
      password: 'admin'
    },
    {
      id: 2,
      username: 'guest',
      password: 'guest'
    }
  ];

  getAllUsers(): Array<User> {
    return this.userList;
  }

  searchUser(query: any): Array<User> {

    const queryProps = Object.getOwnPropertyNames(query);
    let userList1 = this.userList;

    queryProps.forEach((prop: string) => userList1 = this.searchUsersByProperty(userList1, prop, query[prop]));

    return userList1;
  }

  getUserById(userId: number): User {
    return this.userList.find(c => c.id === userId);
  }

  addUser(user: User): User {

    if (!user.username || !user.password) {
      const missingValue = !user.username ? 'username' : 'password';
      throw new HttpException(`Mandatory field "${missingValue}" is missing!`, HttpStatus.BAD_REQUEST);
    }

    const latestId = this.userList[this.userList.length - 1].id;

    this.userList.push({...user, id: (latestId + 1)});

    return user;
  }

  updateUser(user: User): User {

    if (!user.id) {
      throw new HttpException('User ID is necessary to update user data', HttpStatus.BAD_REQUEST);
    } else if (!user.username || !user.password) {
      const missingValue = !user.username ? 'username' : 'password';
      throw new HttpException(`Mandatory field "${missingValue}" is missing!`, HttpStatus.BAD_REQUEST);
    }

    const existingUser = this.userList.find(c => c.id === user.id);
    const existingUserId = this.userList.indexOf(existingUser);

    this.userList.splice(existingUserId, 1, user);

    return user;
  }

  private searchUsersByProperty(customerList: Array<User>, prop: string, value: string): Array<User> {

    return prop && value && value.length > 0 ?
           customerList.filter(
             c => typeof c[prop] === 'string' && c[prop].toUpperCase().indexOf(value.toUpperCase()) !== -1
           ) :
           customerList;
  }

}

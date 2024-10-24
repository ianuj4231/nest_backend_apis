import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }
  @Get()
  async getUsers() {

    try {
      return this.userService.getUsers();
    } catch (error) {
      return {
        message: "error", error
      }
    }

  }

  @Post()
  async createUser( @Body() body: CreateUserDto) 
  {
    try {
      console.log(body);
      return this.userService.createUser(body);
    } catch (error) {
       return {
        message: "error", error
       }
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: any
  ) {
    try {
      const userId = parseInt(id);
      return this.userService.updateUser(userId, body);
    } catch (error) {
      return {
        message: "error", error
      }
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const userId = parseInt(id);
      return this.userService.getUserById(userId);
    }

    catch (error) {
      return {
        message: "error", error
      }
    }

  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const userId = parseInt(id);
      return this.userService.deleteUser(userId);
    } catch (error) {
      return {
        message: "error", error
      }

    }
  }

}

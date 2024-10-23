import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUser.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    async getUsers() {
      return this.userService.getUsers();
    }
  
    @Post()
    async createUser(
      @Body() body: CreateUserDto
    ) {
      return this.userService.createUser(body);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: any
      ) {
        const userId = parseInt(id);
       
        return this.userService.updateUser(userId, body);
      }
    
    @Get(':id')
  async getUserById(@Param('id') id: string){
    const userId = parseInt(id);
    return this.userService.getUserById(userId);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userId = parseInt(id);    
    return this.userService.deleteUser(userId);
  }

}

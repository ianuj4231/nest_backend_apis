import { Injectable, NotFoundException  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    
    async createUser(data: 
         CreateUserDto
    ) {
        const { username, phone, email, gender, address, pincode, city, state, country } = data;
    
        return this.prisma.user.create({
          data: {
            username,
            phone,
            profile: {
              create: {
                email,
                gender,
                address,
                pincode,
                city,
                state,
                country,
              },
            },
          },
        });
      }

      async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
          where: { id },
          include: { profile: true },
        });
        console.log(user);
        
        if (!user) {
          throw new NotFoundException(`user with id=${id} not found`);
        }
        return user;
      }

      async getUsers() {
        return this.prisma.user.findMany({
            include: {
            profile: true,
        },
        });
      }

      async updateUser(id: number, data: any) {
        const user = await this.prisma.user.findUnique({where:{id}});
        
        console.log("before", data);
        

        if (!user) {
          throw new NotFoundException(`user with id=${id} not found`);
        }
    
        const { username, phone, email, gender, address, pincode, city, state, country } = data;
        const updateduser = await this.prisma.user.update({
          where: { id },
          data: {
            username,
            phone,
            profile: {
              update: {
                email: email,
                gender: gender,
                address: address,
                pincode: pincode,
                city: city,
                state: state,
                country: country,
              },
            },
          },
          include: {
            profile: true, 
          },
        });
        console.log(updateduser);
        return updateduser
      }


async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`user with id=${id} not found`);
    }

    await this.prisma.user.delete({
        where: { id },
    });

    return {
        message: `user with id=${id} successfully deleted`,
    };
    } catch (error) {
            return error;
    }
}
}

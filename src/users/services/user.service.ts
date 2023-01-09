import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";
import { User } from "../user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  GetAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  Create(obj: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(obj);
    return this.usersRepository.save(newUser);
  }

  async FindOne(email: string): Promise<User> {
    return this.usersRepository.findOne({where : {email: email}});
  }

  async FindOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({where : {username: username}});
  }
    
  async FindOneById(id: string): Promise<User> {
    return this.usersRepository.findOne({where : {id: id}});
  }
}

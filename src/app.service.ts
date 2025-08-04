import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class AppService {
  private persons: Person[] = [];
  private nextId = 1;

  create(dto: CreatePersonDto): Person {
    const newPerson = new Person(this.nextId++, dto.name, new Date(dto.birthdate));
    this.persons.push(newPerson);
    return newPerson;
  }

  findAll(): Person[] {
    return this.persons;
  }

  findOne(id: number): Person {
    const person = this.persons.find(person => person.id === id);
    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);
    return person
  }

  update(id: number, dto: UpdatePersonDto): Person {
    const person = this.findOne(id);

    if (dto.name) person.name = dto.name;
    if (dto.birthdate) person.birthdate = new Date(dto.birthdate);

    return person;
  }

  remove(id: number): boolean {
    const index = this.persons.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.persons.splice(index, 1);
    return true;
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
    private cars: Car[] = []

    findAll(){
        return this.cars;
    }

    findById(id: string){
        const car = this.cars.find(car => car.id === id);
        if(!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
        
    }

    create( createCarDto: CreateCarDto){
        const newCar:Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar);     
        return  newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto){
        const car = this.findById(id);
        let updatedCar = {...car, ...updateCarDto, id};
        this.cars = this.cars.map(car => car.id === id ? updatedCar : car);
        return updatedCar;
    }

    delete(id: string){
        this.findById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }   

    fillCarsWithSeedData( cars: Car[]){
        this.cars = cars;
    }


    

}

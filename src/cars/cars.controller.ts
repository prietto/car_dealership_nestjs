import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
//@UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }


    @Get(':id')
    getCarById(@Param('id', new ParseUUIDPipe( { version: '4' } )) id: string) {
        console.log(id);
        return this.carsService.findById(id);
    }

    @Post()    
    createCar( @Body() createCarDto: CreateCarDto ){
        return this.carsService.create( createCarDto );        
    }


    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCarDto: UpdateCarDto ){
            return this.carsService.update(id, updateCarDto);
        }


    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe) id: string  ){

        this.carsService.delete(id);
        
        return {
            method: 'delete',
            id
        }

    }



}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMealDto } from './dtos/create-meal.dto';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { MealDto } from './dtos/meal.dto';
import { MealService } from '../meals/meal.service';

//http://server:port/meals    /get a list of all meals in English 
@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealService) {}

  /**
   * Get Collections of Meals the legacy table given.
   * 
   * @returns Promise<MealDto[]>
   */
  @Get()
  getCollection(): Promise<MealDto[]> {
      return this.mealService.getCollection();
  }

  @Get('/:owner')
  getCollectionByOwner(@Param('owner') owner: string): Promise<MealDto[]> {
      return this.mealService.getCollection(owner);
  }

  /**
   * 
   * @param coach is the coach creating a new meal in the legacy table
   * @param dto is the data directly related to the meal
   * @returns the created resource
   */
  @Post(['','/:coach'])
  create(@Param('coach') coach: string, @Body() dto: CreateMealDto){
    if (coach === undefined || coach === 'SYSTEM')
      throw new HttpException('You are not authorized with this API to create SYSTEM meals', HttpStatus.UNAUTHORIZED);
    const obj:MealDto = {
        ...dto,
        owner: coach
    }
    return this.mealService.create(obj);
  }


  @Get(':id')
  getResource(@Param('id') id: string): MealDto {
      return this.mealService.getResource(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMealDto){

  }

  @Delete('/:id')
  delete(@Param('id') id: string){

  }
}
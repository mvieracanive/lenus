import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MealDto } from './meals/dtos/meal.dto';
import { MealService } from './meals/meal.service';

//http://server:port/meals    /get a list of all meals in English 
@Controller()
export class AppController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  apiInfo() {
    
  }
}

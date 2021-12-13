import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateI18nMealDto } from './dtos/create-i18nmeal.dto';
import { I18nMealDto } from './dtos/i18nmeal.dto';
import { UpdateI18nMealDto } from './dtos/update-i18nmeal.dto';
import { I18nMealService } from './i18nmeal.service';
import { plainToClass } from 'class-transformer';

//http://server:port/meals    /get a list of all meals in English 
@Controller('meals')
export class I18nMealsController {
  constructor(private readonly mealService: I18nMealService) {}

  @Get('/:locale/:coach')
  getCollection(
    @Param('locale') locale: string, 
    @Param('coach') coach: string,
    @Query('sort') sortby: string): Promise<I18nMealDto[]> {
      return this.mealService.getCollection(locale, coach, sortby);      
  } 

  @Post('/:id/:locale')
  create(@Param('id') id: string, @Param('locale') locale: string, @Body() dto: CreateI18nMealDto){
    const obj:I18nMealDto = plainToClass(I18nMealDto, {
                        ...dto,
                        id,
                        locale,
                    }, { enableImplicitConversion: true })
    
    return this.mealService.create(obj);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateI18nMealDto){

  }

  @Delete('/:id')
  delete(@Param('id') id: string){

  }
}
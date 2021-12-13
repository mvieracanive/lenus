import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { UpdateI18nMealDto } from '../i18n_meals/dtos/update-i18nmeal.dto';
import { CreateOverrideDto } from './dtos/create-override.dto';
import { OverridenMealsDto } from './dtos/override.dto';
import { OverridenMealsServices } from './override.service';
import { plainToClass } from 'class-transformer';

@Controller('overridenmeals')
export class OverridenMealsController {
  constructor(private readonly mealService: OverridenMealsServices) {}

  @Get('/:locale/:coach')
  getCollection(
    @Param('locale') locale: string, 
    @Param('coach') coach: string,
    @Query('sort') sortby: string
  ): Promise<OverridenMealsDto[]> {
      return this.mealService.getCollection(locale, coach, sortby);
  }

  @Post(['/:id/:locale','/:id/:locale/:coach'])
  async create(
    @Param('id') id: string, 
    @Param('locale') locale: string, 
    @Param('coach') coach: string,
    @Body() dto: CreateOverrideDto, @Res({ passthrough: true }) res: any
    ){
      if (coach === undefined)
        throw new HttpException('You need to provide the coach overriding', HttpStatus.BAD_REQUEST)
      
      const obj:OverridenMealsDto = plainToClass(OverridenMealsDto, {
              ...dto,
              locale,
              coach,
              id,
            }, { enableImplicitConversion: true })

    const createdob = await this.mealService.create(obj);
    res.location(`/overridenmeals/${createdob.id}/${createdob.locale}/${createdob.coach}`)
    return createdob;
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateI18nMealDto){

  }

  @Delete('/:id')
  delete(@Param('id') id: string){

  }
}
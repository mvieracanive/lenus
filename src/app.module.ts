import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { I18nMeal } from './i18n_meals/entities/i18n_meal.entity';
import { I18nMealService } from './i18n_meals/i18nmeal.service';
import { I18nMealsController } from './i18n_meals/i18nmeals.controller';
import { Meal } from './meals/entities/meal.entity';
import { MealService } from './meals/meal.service';
import { MealsController } from './meals/meals.controller';
import { OverridenMeals } from './overrides/entities/override.entity';
import { OverridenMealsController } from './overrides/override.controller';
import { OverridenMealsServices } from './overrides/override.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //load by defaults the file .dev locataed at root of project
    DatabaseModule,
    TypeOrmModule.forFeature([Meal, I18nMeal, OverridenMeals])
  ],
  controllers: [AppController, MealsController, I18nMealsController, OverridenMealsController],
  providers: [MealService, I18nMealService, OverridenMealsServices],
})
export class AppModule {}

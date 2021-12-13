import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OverridenMealsDto } from "./dtos/override.dto";
import { OverridenMeals } from "./entities/override.entity";
import { OverridenMealsServices } from "./override.service";

type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    insert: jest.fn(entity => entity),
}));

describe('OverridenMealsService', () => {
    let service: OverridenMealsServices;
    let repositoryMock: any;
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [
            OverridenMealsServices,
            { 
                provide: getRepositoryToken(OverridenMeals), 
                useFactory: repositoryMockFactory
            },
        ],
      }).compile();
  
      service = app.get<OverridenMealsServices>(OverridenMealsServices);
      repositoryMock = app.get(getRepositoryToken(OverridenMeals));
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    describe('create', () => {
      it('should return an OverridenMealsDto', async () => {
        const id = '982laf902j3klr';
        const coach = 'coach';
        const locale = 'en_US';
        const meal: OverridenMealsDto = new OverridenMealsDto()
        meal.procedure_txt = "proc";
        meal.name = "name";
        meal.locale = locale;
        meal.coach = coach;

        const mealCreated = {
            ...meal,
            id,            
        }
        const result = {
            generatedMaps:[],
            identifiers: [{id, locale, coach}],
            raw: []
        }

        repositoryMock.insert.mockImplementation(entity => result);
        repositoryMock.findOne.mockImplementation(idobj => mealCreated);
        const res = await service.create(meal);
        expect(res).toEqual(mealCreated);
        expect(repositoryMock.findOne).toHaveBeenCalledWith(result.identifiers[0]);
        expect(repositoryMock.insert).toHaveBeenCalledWith(meal);        
      });
    });
  });
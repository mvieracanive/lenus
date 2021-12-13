import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { I18nMealDto } from "./dtos/i18nmeal.dto";
import { I18nMeal } from "./entities/i18n_meal.entity";
import { validate } from 'class-validator';
import { ManualValidatorsHook } from "src/ManualValidation.hook";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { Meal } from "src/meals/entities/meal.entity";

@Injectable()
export class I18nMealService{
    /**
     * 
     * @param _repo repository inyected by the framework to handle database
     */
    constructor(@InjectRepository(I18nMeal) private readonly _repo: Repository<I18nMeal>){}

    async getCollection(
        locale: string, 
        coach: string,
        sort: string = ''
        ):Promise<I18nMealDto[]>{

        const query =  this._repo.createQueryBuilder('tr')
            .select('*')
            .from(Meal, 'meal')
            .where('locale = :l and meal.id::uuid = tr.id::uuid and meal.owner = :c', {l: locale, c: coach})   
            .orderBy(sort ? 'tr.'+sort : '')
            .getQueryAndParameters();

        try{
            const res = await getManager().query(query[0], query[1]);
            return res;
        }
        catch(ex){
            console.log(ex);
            throw new HttpException('Verify parameters, request could not be satisfied.', HttpStatus.BAD_REQUEST)
        }                
    }

    async create(dto: I18nMealDto){
        //validate input
        const v= await ManualValidatorsHook.validateDtoByClassValidator(dto);
        
        try{
            const res = await this._repo.insert(dto);
            return res.identifiers[0].id;
        }
        catch(ex){
            console.log(ex);
            if (ex.code == 23505)
                throw new HttpException('The meal you are trying to translate is already translated in the system', HttpStatus.CONFLICT)
            throw new HttpException('Internal Error. Please check the logs', HttpStatus.INTERNAL_SERVER_ERROR)
        }        
    }

    update(id: string, dto: I18nMealDto){
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }
}
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nMeal } from "../i18n_meals/entities/i18n_meal.entity";
import { Meal } from "../meals/entities/meal.entity";
import { getManager, Repository } from "typeorm";
import { ManualValidatorsHook } from "../ManualValidation.hook";
import { OverridenMealsDto } from "./dtos/override.dto";
import { OverridenMeals } from "./entities/override.entity";

@Injectable()
export class OverridenMealsServices{
    /**
     * 
     * @param _repo repository inyected by the framework to handle database
     */
     constructor(@InjectRepository(OverridenMeals) private readonly _repo: Repository<OverridenMeals>){}

    async getCollection(locale:string, coach: string, sort: string):Promise<OverridenMealsDto[]>{
        const subquery =  getManager().getRepository(I18nMeal)
            .createQueryBuilder('tr')
            .select('tr.*, meal.owner as coach')
            .from(Meal, 'meal')
            .where('locale = :l and meal.id::uuid = tr.id::uuid and meal.owner = :c')   
            .orderBy(sort ? 'tr.'+sort : '')
            .getQuery();

        const query = getManager().createQueryBuilder()
            .select('COALESCE(ov.name, nn.name) as name')
            .addSelect('COALESCE(ov.procedure_txt, nn.procedure_txt) as procedure_txt')
            .addSelect('nn.id, nn.coach, nn.created_at, nn.locale')
            .from('('+subquery+')', 'nn')
            .leftJoin(OverridenMeals, 'ov', 'nn.id::uuid = ov.id::uuid and ov.locale = :l and ov.coach = nn.coach', {l: locale, c: coach})
            .orderBy(sort ? 'nn.'+sort : '')
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

    async getOne(id: string, locale: string, coach: string){
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)        
    }

    async create(dto: OverridenMealsDto):Promise<OverridenMealsDto>{
        //validate input
        const v= await ManualValidatorsHook.validateDtoByClassValidator(dto);
        
        try{
            const res = await this._repo.insert(dto);            
            return await this._repo.findOne(res.identifiers[0]);
        }
        catch(ex){
            console.log(ex);
            if (ex.code == 23505)
                throw new HttpException('The meal you are trying to override is already overriden', HttpStatus.CONFLICT)
            throw new HttpException('Internal Error. Please check the logs', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    update(id: number, dto: OverridenMealsDto){
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }
}
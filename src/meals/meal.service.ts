import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MealDto } from "./dtos/meal.dto";
import { Meal } from "./entities/meal.entity";

@Injectable()
export class MealService{
    /**
     * 
     * @param _repo repository inyected by the framework to handle database
     */
    constructor(@InjectRepository(Meal) private readonly _repo: Repository<Meal>){}


    async getCollection(owner: string = null):Promise<MealDto[]>{
        if (!owner)
            return this._repo.find();
        return this._repo.find({
            where: [{owner}]
        });
    }

    getResource(id:string):MealDto{
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }

    async create(dto: MealDto){
        const res = await this._repo.insert(dto);
        return res.identifiers[0].id;
    }

    update(id: string, dto: MealDto){
        throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
    }
}
import {IsInt, IsLocale} from 'class-validator';

export class OverridenMealsDto{    
    id: string
    @IsLocale({message: "Localization identifier must be valid"})
    locale: string;
    name: string;
    procedure_txt: string;
    coach: string;
    created_at?: Date;
}
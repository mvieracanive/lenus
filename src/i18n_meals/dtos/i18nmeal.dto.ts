import {IsInt, IsLocale} from 'class-validator';


export class I18nMealDto{  
    id?: string
    @IsLocale({message: "Localization identifier must be valid"})
    locale: string;
    name: string;
    procedure_txt?: string;
    created_at?: Date;
}